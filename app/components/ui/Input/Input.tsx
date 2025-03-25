import React, {
    ComponentPropsWithRef,
    forwardRef,
    useState,
    useEffect,
  } from 'react';
  import styles from './Input.module.scss';
  import clsx from 'clsx';
import { PersonStanding } from 'lucide-react';
 
  
  interface InputProps extends ComponentPropsWithRef<'input'> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
  }
  
  const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className, icon = <PersonStanding />, ...props }, ref) => {
      const [focused, setFocused] = useState(false);
      const [hasValue, setHasValue] = useState(!!props.value);
  
      useEffect(() => {
        setHasValue(!!props.value);
      }, [props.value]);
  
      const isActive = focused || hasValue;
  
      return (
        <div className={clsx(styles.wrapper, className)}>
          <div className={styles.inputWrapper}>
            <div className={styles.icon}>{icon}</div>
  
            <span
              className={clsx(styles.floatingLabel, {
                [styles.floatingLabelActive]: isActive,
              })}
            >
              {label}
            </span>
  
            <input
              ref={ref}
              className={clsx(styles.input, { [styles.error]: !!error })}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              {...props}
            />
          </div>
  
          {error && <span className={styles.errorText}>{error}</span>}
        </div>
      );
    }
  );
  
  
  Input.displayName = 'Input';
  
  export default Input;
  