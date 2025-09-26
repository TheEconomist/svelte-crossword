<script>
  export let x;
  export let y;
  export let value;
  export let answer;
  export let number;
  export let index;
  export let custom;
  export let changeDelay = 0;
  export let isRevealing = false;
  export let isChecking = false;
  export let isComplete = false;
  export let isFocused = false;
  export let isSecondarilyFocused = false;
  export let onFocusCell = () => {};
  export let onCellUpdate = () => {};
  export let onFocusClueDiff = () => {};
  export let onMoveFocus = () => {};
  export let onFlipDirection = () => {};
  export let onHistoricalChange = () => {};
  export let small;
  let element;

  $: isFocused, onFocusSelf();
  $: correct = answer === value;
  $: showCheck = isChecking && value && isSecondarilyFocused;

  function onFocusSelf() {
    if (!element) return;
    if (isFocused) element.focus();
  }

  function onKeydown(e) {
    if (e.ctrlKey && e.key.toLowerCase() == "z") {
      onHistoricalChange(e.shiftKey ? 1 : -1);
    }

    if (e.ctrlKey) return;
    if (e.altKey) return;

    if (e.key === "Tab") {
      onFocusClueDiff(e.shiftKey ? -1 : 1);
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (e.key == " ") {
      onFlipDirection();
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (["Delete", "Backspace"].includes(e.key)) {
      onCellUpdate(index, "", -1, true);
      return;
    }

    const isKeyInAlphabet = /^[a-zA-Z()]$/.test(e.key);
    if (isKeyInAlphabet) {
      onCellUpdate(index, e.key.toUpperCase());
      return;
    }

    const diff = {
      ArrowLeft: ["across", -1],
      ArrowRight: ["across", 1],
      ArrowUp: ["down", -1],
      ArrowDown: ["down", 1],
    }[e.key];
    if (diff) {
      onMoveFocus(...diff);
      e.preventDefault();
      e.stopPropagation();
      return;
    }
  }

  function onClick() {
    onFocusCell(index);
  }

  function pop(node, { delay = 0, duration = 250 }) {
    return {
      delay,
      duration,
      css: (t) =>
        [
          `transform: translate(0, ${1 - t}px)`, //
        ].join(";"),
    };
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<g
  class="cell {custom} cell-{x}-{y}"
  class:is-focused={isFocused}
  class:is-secondarily-focused={isSecondarilyFocused}
  class:is-correct={showCheck && correct}
  class:is-incorrect={showCheck && !correct}
  class:is-complete={isComplete}
  class:is-large-complete={!small && isComplete}
  class:is-small-complete={small && isComplete}
  style="--cell-index: {index};"
  transform={`translate(${x}, ${y})`}
  tabIndex="0"
  on:click={onClick}
  on:keydown={onKeydown}
  bind:this={element}
>
  <rect width="1" height="1" class:small></rect>

  {#if showCheck && !correct}
    <line x1="0" y1="1" x2="1" y2="0"></line>
  {/if}

  {#if value}
    <text
      transition:pop={{ duration: 0 }}
      class="value"
      x="0.5"
      y="0.7"
      text-anchor="middle"
    >
      {value}
    </text>
  {/if}
  <text class="number" x="0.08" y="0.3" text-anchor="start">{number}</text>
</g>

<style>
  g {
    cursor: pointer;
    user-select: none;
  }

  g:focus {
    outline: none;
  }

  g.is-secondarily-focused rect {
    fill: var(--secondary-highlight-color);
    stroke: var(--mb-colour-brand-red-60);
  }

  g.is-focused rect {
    fill: var(--primary-highlight-color);
    stroke: var(--mb-colour-brand-red-60);
    stroke-width: 0.05em; /* Slightly thicker stroke */
  }

  text {
    pointer-events: none;
    line-height: 1;
    font-family: var(--ds-type-system-sans-smallcaps);
    fill: var(--ds-color-london-20);
    z-index: 100;
  }

  .value {
    font-size: 0.7em;
    font-weight: 400;
  }

  .number {
    font-size: 0.3em;
    font-weight: 400;
    fill: #333333;
  }

  rect {
    fill: var(--bg-color);
    stroke: var(--main-color);
    stroke-width: 0.01em;
    transition: fill 0.1s ease-out;
  }

  /* animation for when the cell is complete */
  g.is-small-complete rect {
    animation: completeBackground 0s linear forwards;
    animation-delay: calc(var(--cell-index) * 50ms);
  }

  g.is-small-complete text {
    animation: completeText 0.3s linear forwards;
    animation-delay: calc(var(--cell-index) * 50ms);
    opacity: 0;
  }

  g.is-large-complete rect {
    animation: completeBackground 0s linear forwards;
    animation-delay: calc(var(--cell-index) * 10ms);
  }

  g.is-large-complete text {
    animation: completeText 0.1s linear forwards;
    animation-delay: calc(var(--cell-index) * 10ms);
    opacity: 0;
  }

  @keyframes completeBackground {
    0% {
      fill: var(--bg-color);
    }

    100% {
      fill: var(--secondary-highlight-color);
      stroke: var(--mb-colour-brand-red-60);
      stroke-width: 0.05em;
    }
  }

  @keyframes completeText {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  rect.small {
    stroke-width: 0.03em;
    stroke: var(--mb-colour-greyscale-london-70);
  }

  line {
    stroke: var(--main-color);
    stroke-width: 0.02em;
  }
</style>
