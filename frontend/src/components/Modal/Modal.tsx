import { FC } from "react";
import styles from "./Modal.module.scss";
import exitButton from "../../assets/exit-button.svg";

interface IModalProps {
  showModal: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

const Modal: FC<IModalProps> = ({ children, showModal, closeModal }) => {
  return (
    showModal && (
      <>
        <div className={styles.modalBackdrop} onClick={() => closeModal()}>
          <div
            className={styles.modalBody}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={() => closeModal()}>
              <img src={exitButton} />
            </button>
            {children}
          </div>
        </div>
      </>
    )
  );
};

export default Modal;
