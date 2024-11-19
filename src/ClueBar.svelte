<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let currentClue = {};
  export let explanation;
  $: clue = currentClue["clue"];
  $: custom = currentClue["custom"] || "";
</script>

<div class="bar {custom}">
  <div class="bar-inner">
    <button on:click="{() => dispatch('nextClue', currentClue.index - 1)}">
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
        >{clue}
      </p>
    </div>

    <button on:click="{() => dispatch('nextClue', currentClue.index + 1)}">
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
  <div class="explanationContainer">
    <p>{explanation}</p>
  </div>
</div>

<style>
  .bar {
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    align-items: center;
    position: absolute;
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
    text-transform: capitalize;
    font-weight: 600;
  }

  .explanationContainer {
    font-size: 15px;
    margin-bottom: 2rem;
    color: var(--ds-color-london-35);
  }

  .clueContainer {
    padding: 0 1em;
    line-height: 1.325;
    font-family: var(--font);
    font-size: 20px;
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
    p {
      font-size: 17px;
      text-align: center;
      text-wrap: balance;
    }
  }
</style>
