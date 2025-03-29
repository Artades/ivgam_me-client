import { create } from 'zustand';

interface MenuState {
  isOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  openMenu: () => void;
}

export const useMenuStore = create<MenuState>((set) => {
  const setScrollLock = (lock: boolean) => {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = lock ? 'hidden' : '';
    }
  };

  return {
    isOpen: false,
    toggleMenu: () =>
      set((state) => {
        const newState = !state.isOpen;
        setScrollLock(newState);
        return { isOpen: newState };
      }),
    closeMenu: () => {
      setScrollLock(false);
      set({ isOpen: false });
    },
    openMenu: () => {
      setScrollLock(true);
      set({ isOpen: true });
    },
  };
});
