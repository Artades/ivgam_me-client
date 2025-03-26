import React, { ComponentPropsWithRef, forwardRef } from 'react';
import styles from './TextArea.module.scss';
import clsx from 'clsx';

interface TextAreaProps extends ComponentPropsWithRef<'textarea'> {
  label?: string;
  error?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className={clsx(styles.wrapper, className)}>
        {label && <label className={styles.label}>{label}</label>}
        <div className={clsx(styles.inputWrapper, { [styles.error]: !!error })}>
          <textarea
            ref={ref}
            className={styles.textarea}
            {...props}
          />
        </div>
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    );
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;
