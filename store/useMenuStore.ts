
import { create } from "zustand";

interface MenuState {
	isOpen: boolean;
	toggleMenu: () => void;
	closeMenu: () => void;
	openMenu: () => void; 
}

export const useMenuStore = create<MenuState>((set) => ({
	isOpen: false,
	toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
	closeMenu: () => set({ isOpen: false }),
	openMenu: () => set({ isOpen: true }),
}));
