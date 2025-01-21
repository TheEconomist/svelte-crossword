<script>
  import Clue from "./Clue.svelte";

  export let direction;
  export let clues;
  export let focusedClueNumbers;
  export let isDirectionFocused;
  export let onClueFocus;
  export let isDisableHighlight;
</script>

<div class="list-container">
  <p class="header">{direction}</p>
  <div class="list">
    <ul>
      {#each clues as clue}
        <Clue
          clue="{clue.clue}"
          number="{clue.number}"
          custom="{clue.custom}"
          isFilled="{clue.isFilled}"
          isNumberFocused="{focusedClueNumbers[direction] === clue.number}"
          {isDirectionFocused}
          {isDisableHighlight}
          onFocus="{() => onClueFocus(clue)}"
        />
      {/each}
    </ul>
  </div>
</div>

<style>
  .list {
    position: relative;
    max-height: 45vh;
    margin-bottom: 2em;
    overflow: auto;
  }

  .list-container {
    width: 100%;
  }
  p {
    font-family: var(--font);
    color: var(--main-color);
    font-weight: 700;
    text-transform: capitalize;
    padding-bottom: 0.5em;
    font-size: 17px;
    border-bottom: 1px solid black;
    margin: 0;
  }

  ul {
    list-style-type: none;
    padding-left: 0;
    margin: 0;
    margin-top: 1em;
  }

  ::-moz-scrollbar {
    width: 9px;
  }
  ::-webkit-scrollbar {
    width: 9px;
  }

  ::-moz-scrollbar-track {
    box-shadow: none;
    border-radius: 8px;
    background-color: var(--accent-color);
  }
  ::-webkit-scrollbar-track {
    box-shadow: none;
    border-radius: 8px;
    background-color: var(--accent-color);
  }
  ::scrollbar-thumb {
    border-radius: 8px;
    background-color: var(--scrollbar-color);
    box-shadow: none;
  }
  ::-moz-scrollbar-thumb {
    background-color: var(--scrollbar-color);
    border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-color);
    border-radius: 6px;
  }

  @media (max-width: 800px) {
    .list-container {
      width: 100%;
    }
  }
</style>
