import { writable } from "svelte/store";

export function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

const createTimerStore = () => {
  const initialState = {
    seconds: 0,
    interval: null,
    completedTime: null
  };

  const { subscribe, set, update } = writable(initialState);

  return {
    subscribe,
    set,
    update,
    reset: () => {
      update(state => {
        if (state.interval) {
          clearInterval(state.interval);
        }
        return { seconds: 0, interval: null, completedTime: null };
      });
    },
    start: () => {
      update(state => {
        if (!state.interval) {
          const interval = setInterval(() => {
            update(s => ({ ...s, seconds: s.seconds + 1 }));
          }, 1000);
          return { ...state, interval };
        }
        return state;
      });
    },
    complete: () => {
      update(state => {
        if (state.interval) {
          clearInterval(state.interval);
        }
        return { ...state, completedTime: state.seconds, interval: null };
      });
    }
  };
};

export const timerStore = createTimerStore();
