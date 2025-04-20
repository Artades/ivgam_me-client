import { useToastStore } from '@/store/useToastStore';

export const useToastFacade = () => {
  const heading = useToastStore((state) => state.heading);
  const body = useToastStore((state) => state.body);
  const status = useToastStore((state) => state.status);
  const opened = useToastStore((state) => state.opened);
  const setToast = useToastStore((state) => state.setToast);
  const closeToast = useToastStore((state) => state.closeToast);

  return {
    heading,
    body,
    status,
    opened,
    setToast,
    closeToast,
 
    showSuccess: (heading: string, body: string) =>
      setToast({ heading, body, status: 'success' }),

    showError: (heading: string, body: string) =>
      setToast({ heading, body, status: 'error' }),

    showLoading: (heading: string, body: string) =>
      setToast({ heading, body, status: 'loading' }),
  };
};
