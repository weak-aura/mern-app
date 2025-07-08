import React from "react";
import styles from "./Button.module.scss";

export interface ButtonComponentProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined,
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined 
  className?: string | undefined
  disabled?: boolean | undefined
}

export const Button = (props: ButtonComponentProps) => {

  return (
    <button type={props.type}
            disabled={props.disabled}
            onClick={props.onClick}
            className={`${styles.button} ${props.className}`}
    >{props.children}
    </button>
  );
};

