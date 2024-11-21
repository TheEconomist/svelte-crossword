<script>
  import scrollTo from "./helpers/scrollTo.js";

  export let number;
  export let clue;
  export let custom;
  export let isFilled;
  export let isNumberFocused = false;
  export let isDirectionFocused = false;
  export let isDisableHighlight = false;
  export let onFocus = () => {};

  let element;

  $: isFocused = isNumberFocused;

  function stripHtml(html) {
    return html.replace(/<\/?[^>]+(>|$)/g, ""); // Remove tags used for highlighting
  }
</script>

<li bind:this="{element}" use:scrollTo="{isFocused}">
  <button
    class="clue {custom}"
    class:is-disable-highlight="{isDisableHighlight}"
    class:is-number-focused="{isNumberFocused}"
    class:is-direction-focused="{isDirectionFocused}"
    class:is-filled="{isFilled}"
    on:click="{onFocus}"
  >
    <strong>{number}</strong>
    {stripHtml(clue)}
  </button>
</li>

<style>
  li:not(:first-child) {
    border-top: 1px solid #cacaca;
  }
  button {
    display: flex;
    width: 100%;
    background: none;
    text-align: left;
    appearance: none;
    outline: none;
    border: none;
    border-left: 6px solid transparent;
    padding: 0.5em;
    cursor: pointer;
    line-height: 1.325;
    color: var(--main-color);
    font-family: var(--font);
    font-size: 17px;
    cursor: pointer;
  }

  strong {
    min-width: 1.25em;
    display: inline-block;
    text-align: left;
    margin-right: 0.5em;
    font-weight: 600;
  }

  .clue:focus:not(.is-disable-highlight) {
    border-color: var(--secondary-highlight-color);
  }
  .is-number-focused:not(.is-disable-highlight) {
    border-left-color: var(--secondary-highlight-color);
  }
  .is-number-focused.is-direction-focused:not(.is-disable-highlight) {
    background: #fee7e7;
  }
  .is-filled {
    opacity: 0.5;
  }
</style>
