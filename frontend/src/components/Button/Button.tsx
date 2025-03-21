import { FC } from "react";
import styles from "./Button.module.scss";

interface IButtonProps {
  onClick?: () => void;
  type?: ButtonTypes;
  children: React.ReactNode;
}

type ButtonTypes = "submit" | "reset" | "button" | undefined;

const Button: FC<IButtonProps> = ({ onClick, children, type }) => {
  return (
    <>
      <button className={styles.button} type={type} onClick={onClick}>
        {children}
      </button>
    </>
  );
};

export default Button;
