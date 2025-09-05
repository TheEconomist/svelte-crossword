<script>
  import { timerStore, formatTime } from "./helpers/timer.js";
</script>

<div class="timer">
  <span>
    {formatTime($timerStore.seconds)}
  </span>
</div>

<style>
  .timer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--mb-typescale-3);
    font-family: var(--mb-typeface-sans);
    font-weight: 400;
    font-variant-numeric: tabular-nums;
    padding: 0.5rem;
  }
</style>
