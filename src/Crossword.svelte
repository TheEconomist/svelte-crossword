<script>
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import Toolbar from "./Toolbar.svelte";
  import Puzzle from "./Puzzle.svelte";
  import Clues from "./Clues.svelte";
  import CompletedMessage from "./CompletedMessage.svelte";
  import createClues from "./helpers/createClues.js";
  import createCells from "./helpers/createCells.js";
  import validateClues from "./helpers/validateClues.js";
  import { fromPairs } from "./helpers/utils.js";
  import themeStyles from "./helpers/themeStyles.js";
  import ClueBar from "./ClueBar.svelte";
  import ClueTypeToggle from "./ClueTypeToggle.svelte";

  export let data = [];
  export let projectKey = "cryptic";
  export let LocalStorage = false;
  export let small = false;
  export let actions = ["check", "explanation", "reveal", "clear"];
  export let typeActions = ["cryptic", "straight"];
  export let theme = "classic";
  export let revealDuration = 1000;
  export let breakpoint = 800;
  export let revealed = false;
  export let disableHighlight = false;
  export let showCompleteMessage = true;
  export let showConfetti = false;
  export let showKeyboard;
  export let keyboardStyle = "outline";

  let width = 0;
  let focusedDirection = "across";
  let focusedCellIndex = 0;
  let isRevealing = false;
  let isLoaded = false;
  let isChecking = false;
  let revealTimeout;
  let clueCompletion;

  let originalClues = [];
  let validated = [];
  let clues = [];
  let cells = [];
  let clueType = "cryptic";

  const onDataUpdate = () => {
    originalClues = createClues(data);
    validated = validateClues(originalClues);
    clues = originalClues.map((d) => ({ ...d }));
    if (cells.length === 0) {
      cells = createCells(originalClues);
    }
    reset();
  };

  $: data;
  $: focusedCell = cells[focusedCellIndex] || {};
  $: cellIndexMap = fromPairs(cells.map((cell) => [cell.id, cell.index]));
  $: percentCorrect =
    cells.filter((d) => d.answer === d.value).length / cells.length;
  $: isComplete = percentCorrect == 1;
  $: isDisableHighlight = isComplete && disableHighlight;
  $: cells, (clues = checkClues());
  $: cells, (revealed = !clues.filter((d) => !d.isCorrect).length);
  $: stacked = true;
  $: inlineStyles = themeStyles[theme];

  $: showExplanation = false;

  // save current state to localstorage
  onMount(() => {
    isLoaded = true;
    if (browser && LocalStorage) {
      const savedCells = localStorage.getItem(`${projectKey}_crosswordCells`);
      cells = JSON.parse(savedCells || "[]");
    } else {
      originalClues = createClues(data);
      cells = createCells(originalClues);
    }

    onDataUpdate();
  });

  $: if (browser && LocalStorage) {
    if (cells.length > 0) {
      localStorage.setItem(
        `${projectKey}_crosswordCells`,
        JSON.stringify(cells),
      );
    }
  }

  function checkClues() {
    return clues.map((d) => {
      const index = d.index;
      const cellChecks = d.cells.map((c) => {
        const { value } = cells.find((e) => e.id === c.id);
        const hasValue = !!value;
        const hasCorrect = value === c.answer;
        return { hasValue, hasCorrect };
      });
      const isCorrect =
        cellChecks.filter((c) => c.hasCorrect).length === d.answer.length;
      const isFilled =
        cellChecks.filter((c) => c.hasValue).length === d.answer.length;
      return {
        ...d,
        isCorrect,
        isFilled,
      };
    });
  }

  function reset() {
    isRevealing = false;
    isChecking = false;
    // focusedCellIndex = 0;
    showExplanation = false;
  }

  function onClear() {
    reset();
    if (revealTimeout) clearTimeout(revealTimeout);
    const focusedCellIds = focusedClue.cells.map((cell) => cell.id);
    cells = cells.map((cell) => ({
      ...cell,
      value: focusedCellIds.includes(cell.id) ? "" : cell.value,
    }));
  }

  $: focusedClue = clues.find(
    (c) =>
      c.cells.some((cell) => cell.id === focusedCell.id) &&
      c.direction == focusedDirection,
  );

  // function onReveal() {
  //   if (revealed) return true;
  //   reset();
  //   cells = cells.map((cell) => ({
  //     ...cell,
  //     value: cell.answer,
  //   }));
  //   startReveal();
  // }

  function onReveal() {
    if (revealed) return true;
    // reset();
    const focusedCellIds = focusedClue.cells.map((cell) => cell.id);
    cells = cells.map((cell) => ({
      ...cell,
      value: focusedCellIds.includes(cell.id) ? cell.answer : cell.value,
    }));
    startReveal();
  }

  function onCheck() {
    isChecking = !isChecking;
  }

  function startReveal() {
    isRevealing = true;
    isChecking = false;
    if (revealTimeout) clearTimeout(revealTimeout);
    revealTimeout = setTimeout(() => {
      isRevealing = false;
    }, revealDuration + 250);
  }

  let previousFocusedClue = null;

  $: if (focusedClue !== previousFocusedClue) {
    if (showExplanation || isChecking) {
      showExplanation = false;
      isChecking = false;
    }
    previousFocusedClue = focusedClue;
  }

  function onExplanation() {
    showExplanation = true;
  }

  function onToolbarEvent({ detail }) {
    if (detail === "clear") onClear();
    else if (detail === "reveal") onReveal();
    else if (detail === "check") onCheck();
    else if (detail === "explanation") onExplanation();
  }

  function onClueTypeEvent({ detail }) {
    if (detail === "cryptic") changeClueType("cryptic");
    else if (detail === "straight") changeClueType("straight");
  }

  function changeClueType(type) {
    clueType = type;
  }

  $: focusedClueNumbers = focusedCell.clueNumbers || {};

  $: currentClue =
    clues.find(
      (c) =>
        c.direction === focusedDirection &&
        c.number === focusedClueNumbers[focusedDirection],
    ) || {};

  function onClueFocus({ direction, id }) {
    focusedDirection = direction;
    focusedCellIndex = cellIndexMap[id] || 0;
  }

  function onNextClue({ detail }) {
    let next = detail;
    if (next < 0) next = clues.length - 1;
    else if (next > clues.length - 1) next = 0;
    const { direction, id } = clues[next];
    onClueFocus({ direction, id });
  }
</script>

{#if validated}
  <article
    class="svelte-crossword"
    bind:offsetWidth="{width}"
    style="{inlineStyles}"
  >
    {#if small}
      <slot name="typeToolbar" {onClueTypeEvent}>
        <ClueTypeToggle {typeActions} on:event="{onClueTypeEvent}" />
      </slot>
    {/if}
    <slot name="toolbar" {onClear} {onReveal} {onCheck} {onExplanation}>
      <Toolbar {actions} on:event="{onToolbarEvent}" {clueType} />
    </slot>

    <div class="clueBar {showExplanation ? 'explanation' : ''}">
      <ClueBar
        {clueType}
        {currentClue}
        on:nextClue="{onNextClue}"
        {showExplanation}
        {small}
      />
    </div>

    <div class="play" class:stacked class:is-loaded="{isLoaded}">
      <Clues
        {clueType}
        {small}
        {clues}
        {showExplanation}
        {cellIndexMap}
        {stacked}
        {isDisableHighlight}
        {isLoaded}
        bind:focusedCellIndex
        bind:focusedCell
        bind:focusedDirection
      />
      <Puzzle
        {small}
        {clues}
        {focusedCell}
        {isRevealing}
        {isChecking}
        {isDisableHighlight}
        {revealDuration}
        {showKeyboard}
        {stacked}
        {isLoaded}
        {keyboardStyle}
        bind:cells
        bind:focusedCellIndex
        bind:focusedDirection
      />
    </div>

    {#if isComplete && !isRevealing && showCompleteMessage}
      <CompletedMessage {showConfetti}>
        <slot name="message">
          <h3>You solved it!</h3>
        </slot>
      </CompletedMessage>
    {/if}
  </article>
{/if}

<style>
  article {
    position: relative;
    background-color: transparent;
    font-size: 16px;
  }

  .play {
    display: flex;
    /* margin-top: 5rem; */
    flex-direction: var(--order, row);
  }

  .clueBar {
    margin-bottom: 2rem;
    height: 60px;
  }

  .clueBar.explanation {
    height: 100px;
  }

  .play.is-loaded.stacked {
    flex-direction: column;
  }

  h3 {
    margin: 0;
    margin-bottom: 0.5em;
  }

  @media only screen and (max-width: 720px) {
    .play:not(.is-loaded) {
      flex-direction: column;
    }
  }
</style>
