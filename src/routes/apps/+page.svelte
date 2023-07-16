<script lang="ts">
  import LinkedBox from '$lib/components/LinkedBox.svelte'
</script>

<h1 class="headline">Apps</h1>
<p class="justify">
  Here you can find an overview of little standalone applications I created. I mostly created them just for fun though,
  so no guarantees for them operating correctly. <br />
  The apps are hosted as static files and can be used from anywhere as their scripts come from CDNs.
</p>

<ul>
  <li>
    <LinkedBox to="/apps/memo/" external>
      <h1 slot="header" class="headline">Memo</h1>
      <p>
        This app allows the creation of very simple notes, using the url query parameters. To create notes, you have to
        modify your url like this:<br />
        <code>../memo?Note%20A;Note%20B</code><br />
        The notes are separated by semicolons.
      </p>
    </LinkedBox>
  </li>
  <li>
    <LinkedBox to="/apps/timer" external>
      <h1 slot="header" class="headline">Timer</h1>
      <p>
        A small but handy timer application, supporting timer and stopwatch mode. Modify the time with the scroll wheel.
        No mobile support.
      </p>
    </LinkedBox>
  </li>
  <li>
    <LinkedBox to="/apps/rainbow-randomizer" external>
      <h1 slot="header" class="headline">Rainbow 6 Randomizer</h1>
      <p>
        A tool to randomly pick a Rainbow 6 Siege operator. You can even add nicknames! Click on the names on the left
        to disable certain operators.
      </p>
    </LinkedBox>
  </li>
  <li>
    <LinkedBox to="/apps/pascal-yeeter" external>
      <h1 slot="header" class="headline">Pascal source code yeeter</h1>
      <p>
        A very rudimentary tool which converts Pascal / Delphi source code into yeets using macros. I saw this on reddit
        for C++ so I had to recreate it for the <strong>best</strong> language.
      </p>
    </LinkedBox>
  </li>
</ul>

<svelte:head>
  <title>Apps - vypxl</title>
  <meta name="description" content="A collection of small standalone apps I created." />
</svelte:head>

<style lang="scss">
  li {
    margin-bottom: 2em;
  }

  .headline {
    text-align: center;
  }

  .justify {
    text-align: justify;
  }
</style>
