"use client";

import styles from './Toast.module.scss';
import { ToastStatus } from '@/store/useToastStore';
import { CircleCheck, CircleX, Loader } from 'lucide-react';
import React, { useEffect } from 'react';
import { useToastFacade } from '@/facades/useToastFacade';
import clsx from 'clsx';

const icons: Record<ToastStatus, React.ElementType> = {
  error: CircleX,
  loading: Loader,
  success: CircleCheck,
};

const Toast = () => {
  const { heading, body, status, opened, closeToast } = useToastFacade();
  const Icon = icons[status];

  useEffect(() => {
    if (opened && status !== 'loading') {
      const timer = setTimeout(() => {
        closeToast();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [opened, status, closeToast]);

  if (!opened) return null;

  return (
    <div className={clsx(styles.toast, styles[status])}>
      <div className={styles.icon}>
        <Icon  />
      </div>
      <div className={styles.content}>
        <h4 className={clsx(styles.heading, styles[status])}>{heading}</h4>
        <p className={styles.body}>{body}</p>
      </div>
      
    </div>
  );
};

export default Toast;
