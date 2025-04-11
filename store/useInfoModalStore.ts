import { create } from "zustand";

interface InfoModalState {
    isOpen: boolean,
    toggleModal: () => void;
}

export const useInfoModalStore = create<InfoModalState>((set) => {
    const setScrollLock = (lock: boolean) => {
        if (typeof window !== 'undefined') {
          document.body.style.overflow = lock ? 'hidden' : '';
        }
      };

      return {
        isOpen: false,
        toggleModal: () =>  {
            set((state) => {
                const newState = !state.isOpen;
                setScrollLock(newState);
                return {isOpen: newState}
            })
        }
      }
})