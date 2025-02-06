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
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: white;
    border: 0.0625rem solid var(--ds-color-london-70);
    border-radius: 0.25rem;
    box-shadow: none;
    box-sizing: border-box;
    color: var(--ds-color-beijing);
    cursor: pointer;
    font-family: var(--ds-type-system-sans-lining);
    font-size: var(--ds-type-scale-0);
    font-weight: 300;
    height: var(--btn-height);
    line-height: var(--ds-type-leading-lower);
    padding: 0.3125rem var(--ds-grid-gap);
    text-decoration: none;
    transition: background-color var(--ds-interactions-transition);
    will-change: background-color;
    transition: border-color var(--ds-interactions-transition);
    will-change: border-color;
    min-width: 120px;
  }
  button:hover {
    background-color: #f2f2f2;
  }

  button.active {
    background-color: #f2f2f2;
    font-weight: 400;
    border-color: black;
    z-index: 4;
  }

  button:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  button:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    /* border-right: none; */
  }

  @media (max-width: 600px) {
    button {
      font-size: var(--ds-type-scale--1);
    }
  }
</style>
