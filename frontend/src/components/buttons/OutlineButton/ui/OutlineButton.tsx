
import styles from "./OutlineButton.module.scss";
import {ButtonComponentProps} from "../../Button/ui/Button.tsx";


export const OutlineButton = (props: ButtonComponentProps) => {
  return (
    <button className={`${styles.outline_button} ${props.className}`}>
      {props.children}
    </button>
  );
};

