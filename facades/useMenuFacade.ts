import { useMenuStore } from "@/store/useMenuStore";


export const useMenuFacade = () => {
	const isOpen = useMenuStore((state) => state.isOpen);
	const toggleMenu = useMenuStore((state) => state.toggleMenu);
	const closeMenu = useMenuStore((state) => state.closeMenu);
	const openMenu = useMenuStore((state) => state.openMenu);

	return {
		isOpen,
		toggleMenu,
		closeMenu,
		openMenu,
	};
};
