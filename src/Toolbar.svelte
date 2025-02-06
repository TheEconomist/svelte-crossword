<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let actions = ["check", "explanation", "reveal", "clear"];
  export let clueType;

  function toggleButton(action) {
    // activeButtons[action] = !activeButtons[action];
    dispatch("event", action);
  }
</script>

<div class="toolbar">
  {#each actions as action}
    {#if action === "check"}
      <button on:click="{() => toggleButton('check')}">Check</button>
    {:else if action === "explanation"}
      <button
        on:click="{() => toggleButton('explanation')}"
        class:disabled="{clueType !== 'cryptic'}">Explain</button
      >
    {:else if action === "reveal"}
      <button on:click="{() => dispatch('event', 'reveal')}">Answer</button>
    {:else if action === "clear"}
      <button on:click="{() => dispatch('event', 'clear')}">Clear</button>
    {/if}
  {/each}
</div>

<style>
  .toolbar {
    padding: 1em 0;
    display: flex;
    justify-content: center;
    font-family: var(--font);
    font-size: 15px;
    background-color: transparent;
  }

  button {
    cursor: pointer;
    margin-left: 1em;
    font-size: 1em;
    font-family: var(--font);
    background-color: var(--accent-color);
    border-radius: 4px;
    color: var(--main-color);
    padding: 0.4rem 1rem;
    border: 1px solid #cacaca;
    font-weight: 400;
    transition: background-color 150ms;
  }

  button.disabled {
    background-color: var(--mb-colour-greyscale-london-70);
    color: var(--mb-colour-greyscale-london-40);
    border: 1px solid transparent;
    pointer-events: none;
  }

  button:hover {
    background-color: var(--secondary-highlight-color);
  }
</style>
