import { ComponentProps, forwardRef } from "react";
import clsx from "clsx";
import { EButtonSizes, EButtonVariants } from "@/types/ui";
import styles from "./Button.module.scss";

interface ButtonProps extends ComponentProps<'button'> {
  size?: EButtonSizes;
  variant?: EButtonVariants;
  children: React.ReactNode;
  ref?: React.RefObject<HTMLButtonElement>;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    children,
    size = EButtonSizes.DEFAULT,
    variant = EButtonVariants.PRIMARY,
    ref,
    ...props
  }) => {
    const buttonClass = clsx(styles.button, styles[size], styles[variant]);

    const content = (
      <button className={buttonClass} {...props}>
        {children}
      </button>
    );

    return content;
  }
);

Button.displayName = "Button";
export default Button;
