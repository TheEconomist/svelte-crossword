<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let currentClue = {};
  export let showExplanation;
  export let clueType;

  $: clue =
    clueType === "cryptic" ? currentClue["clue"] : currentClue["straight_clue"];
  $: custom = currentClue["custom"] || "";

  // bold text in gdoc clues will be highlighted
  $: highlightStrongTags = (clue) =>
    showExplanation
      ? clue.replace(
          /<strong>(.*?)<\/strong>/g,
          '<span style="background-color:#ffe7e7; padding:2px 4px">$1</span>',
        )
      : clue;
</script>

<div class="bar {custom}">
  <div class="bar-inner">
    <button on:click={() => dispatch("nextClue", currentClue.index - 1)}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-chevron-left"
      >
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>
    <div class="clueContainer">
      <p>
        <span class="currentClue"
          >{currentClue.number + " " + currentClue.direction}</span
        >{@html highlightStrongTags(clue)}
      </p>
      {#if showExplanation}
        <div class="explanationContainer">
          <p>{currentClue.explanation}</p>
        </div>
      {/if}
    </div>

    <button on:click={() => dispatch("nextClue", currentClue.index + 1)}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-chevron-right"
      >
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>
  </div>
</div>

<style>
  .bar {
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    align-items: center;
    /* position: absolute; */
    top: 4rem;
  }

  .bar-inner {
    border-top: 1px solid #cacaca;
    padding-top: 1rem;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-start;
  }

  .currentClue {
    margin-right: 0.5rem;
    font-weight: 600;
  }

  .explanationContainer {
    font-size: 17px;
    width: 100%;
    color: var(--ds-color-london-35);
    margin-top: 0.5rem;
  }

  .clueContainer {
    padding: 0 1em;
    line-height: 1.325;
    font-family: var(--font);
    font-size: 20px;
    text-wrap: pretty;
  }

  button {
    cursor: pointer;
    font-size: 1em;
    border: none;
    line-height: 1;
    color: var(--main-color);
    background-color: transparent;
  }

  @media (max-width: 720px) {
    .clueContainer {
      font-size: 17px;
      padding: 0;
    }

    button {
      padding: 0 2px;
    }

    .explanationContainer {
      font-size: 15px;
    }
  }
</style>
