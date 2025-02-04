<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  export let actions = ["cryptic", "straight"];

  let activeButtons = {
    cryptic: true,
    straight: false,
  };

  function toggleButton(action) {
    activeButtons.cryptic = false;
    activeButtons.straight = false;
    activeButtons[action] = true;
    dispatch("event", action);
  }
</script>

<div class="toolbar">
  {#each actions as action}
    {#if action === "cryptic"}
      <button
        class:active="{activeButtons.cryptic}"
        on:click="{() => toggleButton('cryptic')}">Cryptic</button
      >
    {:else if action === "straight"}
      <button
        class:active="{activeButtons.straight}"
        on:click="{() => toggleButton('straight')}">Straight</button
      >
    {/if}
  {/each}
</div>

<style>
  .toolbar {
    margin-bottom: 1em;
    padding-top: 2rem;
    display: flex;
    justify-content: center;
    font-family: var(--font);
    font-size: 15px;
    background-color: transparent;
  }

  button {
    cursor: pointer;
    margin-left: -1px;
    font-size: 1em;
    font-family: var(--font);
    background-color: var(--accent-color);
    /* border-radius: 4px; */
    color: var(--main-color);
    padding: 0.4rem 1rem;
    border: 1px solid #cacaca;
    font-weight: 400;
    transition: background-color 150ms;
  }

  button.active {
    background-color: #ffe7e7;
    border: 1px solid transparent;
    z-index: 2;
    font-weight: 500;
  }

  button:hover {
    background-color: var(--secondary-highlight-color);
  }
</style>
