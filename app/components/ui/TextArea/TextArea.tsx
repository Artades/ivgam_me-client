import React, { ComponentPropsWithRef, forwardRef } from 'react';
import styles from './TextArea.module.scss';
import clsx from 'clsx';

interface TextAreaProps extends ComponentPropsWithRef<"textarea"> {
  label?: string;
  error?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className={clsx(styles.wrapper, className)}>
        {label && <label className={styles.label}>{label}</label>}
        <TextArea
          ref={ref}
          className={clsx(styles.TextArea, { [styles.error]: !!error })}
          {...props}
        />
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    );
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;

