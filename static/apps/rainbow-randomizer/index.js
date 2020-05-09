const ATTACK = ['Recruit', 'Sledge', 'Thatcher', 'Ash', 'Thermite', 'Twitch', 'Montagne', 'Glaz', 'Fuze', 'Blitz', 'IQ', 'Buck', 'Blackbeard', 'Capitão', 'Hibana', 'Jackal', 'Ying', 'Zofia', 'Dokkaebi', 'Lion', 'Finka', 'Maverick', 'Nomad', 'Gridlock', 'Nøkk', 'Amaru', 'Kali', 'Iana'];
const DEFEND = ['Recruit', 'Smoke', 'Mute', 'Castle', 'Pulse', 'Doc', 'Rook', 'Kapkan', 'Tachanka', 'Jäger', 'Bandit', 'Frost', 'Valkyrie', 'Caveira', 'Echo', 'Mira', 'Lesion', 'Ela', 'Vigil', 'Maestro', 'Alibi', 'Clash', 'Kaid', 'Mozzie', 'Warden', 'Goyo', 'Wamai', 'Oryx'];

const app = new Vue({
    el: '#app',
    data: {
        operators: ['Recruit', 'Pulse'],
        choice: { name: "🤔<br>&lt;Space&gt;" },
        mode: 'attack',
        opdata: [],
    },
    methods: {
        choose: function () {
            let ops = this.opdata[this.mode].filter(op => op.available);
            this.choice = ops[Math.floor(Math.random() * ops.length)];
        },
        changeMode: function(newMode) {
            this.mode = newMode;
        },
        updateNickname: function(op) {
            op.nickname = prompt(`New nickname for ${op.name}:`);
            this.saveData();
        },
        toggleEnabled: function(op) {
            op.available = !op.available;
            console.log(op.available);
            this.saveData();
        },
        saveData: function() {
            localStorage.setItem("opdata", JSON.stringify(this.opdata));
        },
        loadData: function() {
            if (!localStorage.getItem("opdata")) {
                localStorage.setItem("opdata", JSON.stringify({
                    attack: ATTACK.map(x => ({
                        name: x,
                        nickname: null,
                        available: true,
                    })),
                    defend: DEFEND.map(x => ({
                        name: x,
                        nickname: null,
                        available: true,
                    })),
                }));
            }
            this.opdata = JSON.parse(localStorage.getItem("opdata"));
        },
        clearData: function() {
            localStorage.removeItem("opdata");
            this.loadData();
        }
    },
    beforeMount: function() {
        this.loadData();

        let vm = this;
        window.addEventListener('keydown', function(e) {
            if (e.keyCode === 32) vm.choose();
            else if (e.keyCode === 9) vm.mode = vm.mode === 'attack' ? 'defend' : 'attack';
            else return true;
            e.preventDefault();
            return false;
        });
    },
});
