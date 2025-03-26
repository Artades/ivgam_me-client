import React, { ComponentPropsWithRef, forwardRef, ReactNode } from 'react';
import styles from './Input.module.scss';
import clsx from 'clsx';

interface InputProps extends ComponentPropsWithRef<'input'> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, icon, ...props }, ref) => {
    return (
      <div className={clsx(styles.wrapper, className)}>
        {label && <label className={styles.label}>{label}</label>}
        <div className={clsx(styles.inputWrapper, { [styles.error]: !!error })}>
          {icon && <div className={styles.icon}>{icon}</div>}
          <input
            ref={ref}
            className={styles.input}
            {...props}
          />
        </div>
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
