import { create } from "zustand";

export type ToastStatus = "success" | "error" | "loading";

interface ToastState {
  opened: boolean;
  heading: string;
  body: string;
  status: ToastStatus;
}

interface ToastAction {
  setToast: (data: Pick<ToastState, 'heading' | 'body' | 'status'>) => void;
  closeToast: () => void;
}

export const useToastStore = create<ToastState & ToastAction>((set) => ({
  opened: false,
  heading: '',
  body: '',
  status: 'success',
  
  setToast: (data) => {
    set({
      ...data,
      opened: true,
    });
  },

  closeToast: () => {
    set({ opened: false });
  },
}));
