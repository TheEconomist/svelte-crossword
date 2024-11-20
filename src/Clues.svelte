<script>
  import ClueList from "./ClueList.svelte";
  import ClueBar from "./ClueBar.svelte";

  export let clues;
  export let cellIndexMap;
  export let focusedDirection;
  export let focusedCellIndex;
  export let focusedCell;
  export let stacked;
  export let isDisableHighlight;
  export let isLoaded;

  $: focusedClueNumbers = focusedCell.clueNumbers || {};

  function onClueFocus({ direction, id }) {
    focusedDirection = direction;
    focusedCellIndex = cellIndexMap[id] || 0;
  }
</script>

<section class="clues" class:stacked class:is-loaded="{isLoaded}">
  <div class="clues--stacked">
    {#each ["across", "down"] as direction}
      <ClueList
        {direction}
        {focusedClueNumbers}
        clues="{clues.filter((d) => d.direction === direction)}"
        isDirectionFocused="{focusedDirection === direction}"
        {isDisableHighlight}
        {onClueFocus}
      />
    {/each}
  </div>

  <div class="clues--list">
    {#each ["across", "down"] as direction}
      <ClueList
        {direction}
        {focusedClueNumbers}
        clues="{clues.filter((d) => d.direction === direction)}"
        isDirectionFocused="{focusedDirection === direction}"
        {isDisableHighlight}
        {onClueFocus}
      />
    {/each}
  </div>
</section>

<style>
  section {
    position: sticky;
    top: 1em;
    flex: 0 1 16em;
    height: fit-content;
    margin: 0;
    margin-right: 1em;
  }

  section.is-loaded.stacked {
    position: static;
    height: auto;
    top: auto;
    display: block;
    margin: 2em 0;
    flex: auto;
  }

  .clues--stacked {
    margin: 0;
    display: none;
    order: -1;
  }

  .is-loaded.stacked .clues--stacked {
    display: inline-flex;
    gap: 2rem;
  }

  .is-loaded.stacked .clues--list {
    display: none;
  }

  @media only screen and (max-width: 720px) {
    section:not(.is-loaded) {
      position: static;
      height: auto;
      top: auto;
      display: block;
      margin: 1em 0;
      flex: auto;
    }

    .is-loaded.stacked .clues--stacked {
      display: block;
      gap: 0;
    }

    .clues--stacked:not(.is-loaded) {
      display: block;
    }

    .clues--list:not(.is-loaded) {
      display: none;
    }
  }
</style>
