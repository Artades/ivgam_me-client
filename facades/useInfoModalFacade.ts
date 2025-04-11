import { useInfoModalStore } from "@/store/useInfoModalStore";

export const useInfoModalFacade = () => {
  const isOpen = useInfoModalStore((state) => state.isOpen);

  const toggleModal = useInfoModalStore((state) => state.toggleModal);

  return {
    isOpen,
    toggleModal,
  };
};
