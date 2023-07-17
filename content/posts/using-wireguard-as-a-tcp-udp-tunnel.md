---
title: Using Wireguard as a TCP/UDP tunnel
slug: using-wireguard-as-a-tcp-udp-tunnel
tags: ['networking']
published: 2023-07-16
description: My journey and how I set up Wireguard to expose the services running on my home server to the internet using Wireguard to tunnel through NAT boundaries, with the help of an Oracle Cloud free instance.
---

# Using wireguard as a TCP/UDP tunnel

Hi. If you're here for the solution and not the story, skip ahead to [Solution](#solution).

## Background

Recently, my ISP decided to not grant me a public IP address for my router anymore,
so I've had look at alternative solutions to make my home server accessible from outside.

I looked at [Cloudflare Tunnels](https://www.cloudflare.com/products/tunnel/) and [frp](https://github.com/fatedier/frp) hosted on my oracle cloud vps after I found this [awesome list](https://github.com/anderspitman/awesome-tunneling) about tunneling. Sadly, cloudflare tunnels don't support video streaming, and frp (or other tunneling programs I tested, also those specifically geared towards performance) was just too slow. I had speeds of about 5-10 mbps, which was unacceptable (every network link had 1000mbps bandwidth).

So how did I solve it? After way too many hours of testing and debugging, I arrived at a solution. A wireguard tunnel. I got the idea randomly. "I want to establish a tunnel, isn't this exactly what wireguard is for?"

## Wireguard

What is wireguard? I don't think I'm qualified to answer this, but as far as I understand, it's a tunneling protocol that is built into kernel (Linux at least, and I believe Windows too). So it should be quite fast. Usually, it's used as a VPN, but it's just a tunnel that **can** be used to create a VPN.

> Wireguard just creates a network interface on both ends and tunnels traffic between them as if they were physically connected.

## Solution

So here is how to tunnel any traffic from the internet to a server behind a NAT with wireguard (WG).

This guide explains how to achieve this for two Linux servers. Mine are running Ubuntu server, so I'll be using it as an example.

Disclaimer: This is what worked for me. You might have to modify some parts of this guide.

### Overview

Prerequisites:

- (H) Home server
- (C) Cloud Server (VPS)

Steps:

1. Create a wireguard connection between H and C
2. Configure C to forward incoming traffic on specific ports to H via our WG interface
3. Configure H to only send traffic that was initiated by C back to C. (More on this later)

So an incoming request would be routed like this:

Device (request) -> C.example.com -> H (behind NAT) (respond) -> C.example.com -> Device

### Cloud Server (C) configuration

#### 1. Install wireguard and required tools

```bash
sudo add-apt-repository ppa:wireguard/wireguard
sudo apt update
sudo apt install wireguard wireguard-tools resolvconf
```

#### 2. Generate a keypair

```bash
sh -c "umask 077;wg genkey | tee privatekey | wg pubkey > publickey"
```

#### 3. Set up the wireguard interface

```bash
sudo vim /etc/wireguard/wg0.conf
```

```toml
[Interface]
Address = 10.22.0.1/24 # Or choose your own subnet
ListenPort = 2333 # I set 2333 because I'll be using the default port 51820 elsewhere
PostUp = /home/ubuntu/add_tunnel_rules.sh # We will create this and the next script later
PostDown = /home/ubuntu/remove_tunnel_rules.sh
PrivateKey = *** # The one we generated earlier

[Peer]
AllowedIPs = 10.22.0.2/32 # Make sure this the exact IP of H and note the /32
PublicKey = *** # The public key of the home server (we will generate this later)
```

#### 4. Start the service

```bash
sudo systemctl enable --now wg-quick@wg0
```

#### 5. Confirm forwarding is enabled

```bash
$ cat /proc/sys/net/ipv4/ip_forward
1
$ ubuntu@x86-server-0 ~> cat /proc/sys/net/ipv4/conf/all/rp_filter
2
```

If this does not show `1` and `2` respectively, set these in `/etc/sysctl.conf`:

```bash
net.ipv4.ip_forward=1
net.ipv4.conf.all.rp_filter=2
```

#### 6. Create NAT forwarding rules

This is perhaps the most difficult step. As my servers are still running the old Ubuntu 20.04, I'm using the great piece of software that is IPTables. My VPS is running on the Oracle Cloud free tier,
and Oracle Cloud has some intricacies.

To get it working on oracle cloud, I arrived at these scripts after reading the top comment on [this reddit post](https://www.reddit.com/r/WireGuard/comments/oxmcvx/comment/h7nl24o/?context=3) (hail spez).

```bash
$ vim add_tunnel_rules.sh

#!/bin/bash

if [[ $EUID -ne 0 ]]; then
  echo "Error: This script must be run as root."
  exit 1
fi

IPT="/sbin/iptables"

IN_FACE="ens3"                   # NIC connected to the internet, check using `ip addr`
WG_FACE="wg0"                    # WG NIC
SUB_NET="10.22.0.0/24"           # WG IPv4 sub/net aka CIDR, same as in WG config
WG_PORT="2333"                   # WG udp port, same as in WG config

# Rules for wireguard to work
$IPT -t nat -I POSTROUTING 1 -s $SUB_NET -o $IN_FACE -j MASQUERADE
$IPT -I INPUT 1 -i $WG_FACE -j ACCEPT
$IPT -I FORWARD 1 -i $IN_FACE -o $WG_FACE -j ACCEPT
$IPT -I FORWARD 1 -i $WG_FACE -o $IN_FACE -j ACCEPT
$IPT -I INPUT 1 -i $IN_FACE -p udp --dport $WG_PORT -j ACCEPT

# Rules to forward ports 80, 443 and 51820
rules=("80:tcp" "443:tcp" "51820:udp")
for rule in "${rules[@]}"
do
    IFS=':' read -r port protocol <<< "$rule"

    $IPT -t nat -A PREROUTING -i $IN_FACE -p $protocol --dport $port -j DNAT --to-destination 10.22.0.2:$port
    $IPT -t nat -A POSTROUTING -o $WG_FACE -p $protocol --dport $port -d 10.22.0.2 -j SNAT --to-source 10.22.0.1
done
```

```bash
$ vim remove_tunnel_rules.sh

#!/bin/bash

if [[ $EUID -ne 0 ]]; then
  echo "Error: This script must be run as root."
  exit 1
fi

IPT="/sbin/iptables"

IN_FACE="ens3"                   # NIC connected to the internet, check using `ip addr`
WG_FACE="wg0"                    # WG NIC
SUB_NET="10.22.0.0/24"           # WG IPv4 sub/net aka CIDR, same as in WG config
WG_PORT="2333"                   # WG udp port, same as in WG config

# Rules for wireguard to work
$IPT -t nat -D POSTROUTING 1 -s $SUB_NET -o $IN_FACE -j MASQUERADE
$IPT -D INPUT -i $WG_FACE -j ACCEPT
$IPT -D FORWARD -i $IN_FACE -o $WG_FACE -j ACCEPT
$IPT -D FORWARD -i $WG_FACE -o $IN_FACE -j ACCEPT
$IPT -D INPUT -i $IN_FACE -p udp --dport $WG_PORT -j ACCEPT

# Rules to forward ports 80, 443 and 51820
rules=("80:tcp" "443:tcp" "51820:udp")
for rule in "${rules[@]}"
do
    IFS=':' read -r port protocol <<< "$rule"

    $IPT -t nat -D PREROUTING -i $IN_FACE -p $protocol --dport $port -j DNAT --to-destination 10.22.0.2:$port
    $IPT -t nat -D POSTROUTING -o $WG_FACE -p $protocol --dport $port -d 10.22.0.2 -j SNAT --to-source 10.22.0.1
done
```

You don't need to save these rules, as they are automatically applied and removed when the WG interface goes up/down. See the interface configuration.

#### 7. Open the ports at your cloud provider

Don't forget this! I opened ports `80/tcp`, `443/tcp` and `51820/udp`.
For Oracle cloud, I recommend [this guide](https://medium.com/@fathi.ria/oracle-database-cloud-open-ports-on-oci-1af24f4eb9f2).

### Home serve (H) configuration

#### 1. Install wireguard and required tools

```bash
sudo add-apt-repository ppa:wireguard/wireguard
sudo apt update
sudo apt install wireguard wireguard-tools resolvconf
```

#### 2. Generate a keypair

```bash
sh -c "umask 077;wg genkey | tee privatekey | wg pubkey > publickey"
```

#### 3. Set up the wireguard interface

```bash
sudo vim /etc/wireguard/wg0.conf
```

```toml
[Interface]
Address = 10.22.0.2/32 # Note the /32, we want H to have this exact ip
ListenPort = 2333 # I set 2333 because I'll be using the default port 51820 elsewhere
PrivateKey = # The one we generated earlier

[Peer]
PublicKey = *** # The public key of the cloud server
AllowedIPs = 10.22.0.0/24 # This is important. We only want to route traffic originating from our tunnel to go back through our tunnel.
Endpoint = x.x.x.x:2333 # The public IP of the cloud server.
```

#### 4. Start the service

```bash
sudo systemctl enable --now wg-quick@wg0
```

Done!

### Testing

Now, to test our setup, run a listener on the home server, for example a web server or netcat:

```bash
sudo nc -l -p 80
```

Then, from you device try to reach the listener:

```bash
curl -v <vps ip>
```

Netcat should show your http request, or curl the response of your web server.

## What we achieved

This setup can now tunnel tcp or udp traffic over any ports we want with ease and performance.
My setup can serve http and https services and my wireguard VPN running on my home server (yes, wireguard over wireguard) via the tunnel as if I would connect to my home server directly. It is significantly faster than any other tunneling software I've tried.

It's way to complicated to set up for my taste, but it works. There should be an easier way to do this, maybe with a nice cli that takes care of all this. If you know of one, let me know.

I do know about [docker-wireguard-tunnel](https://github.com/DigitallyRefined/docker-wireguard-tunnel), but that only works for docker internal connections, not general applications.

I hope this could save someone some time. I spent so much time debugging my configuration until I arrived here, so yeah.. I hope no one has to do this again.
