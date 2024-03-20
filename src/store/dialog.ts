import { create } from 'zustand'

interface DialogState {
  isOpen: boolean;
  setIsOpen: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  isOpen: false,
  setIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}))