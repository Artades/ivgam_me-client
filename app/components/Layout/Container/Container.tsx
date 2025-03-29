import React from "react";
import styles from "./Container.module.scss";

interface ContainerProps extends React.HTMLProps<HTMLDivElement> {
  className?: string;

  style?: React.CSSProperties;

  [key: string]: any;
}

const Container: React.FC<ContainerProps> = ({
  className,
  style,
  children,
  ...props
}) => {
  return (
    <div
      className={`${styles.container} ${className ? className : ""}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
