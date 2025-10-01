import { create } from 'zustand'

// Define the store type
interface CounterState {
  value: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

// Create the store
export const useCounterStore = create<CounterState>((set) => ({
  value: 0,
  increment: () => set((state) => ({ value: state.value + 1 })),
  decrement: () => set((state) => ({ value: state.value - 1 })),
  reset: () => set({ value: 0 }),
}))
