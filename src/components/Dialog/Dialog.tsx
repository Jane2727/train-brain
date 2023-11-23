import { useEffect, useRef } from "react";
import { DialogProps } from "../../models";
import "./Dialog.css";
import { isClickInsideRectangle } from "../../helpers";
import ButtonControl from "../ButtonControl/ButtonControl";

const Dialog = ({
  className,
  title,
  isOpened,
  handleCloseModal,
  children,
}: DialogProps): JSX.Element => {
  const classNames = className ? `modal ${className}` : "modal";

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpened) {
      dialogRef.current?.showModal();
      document.body.classList.add("modal-open"); // prevent bg scroll
    } else {
      dialogRef.current?.close();
      document.body.classList.remove("modal-open");
    }
  }, [isOpened]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  return (
    <dialog
      className={classNames}
      ref={dialogRef}
      onKeyDown={handleKeyDown}
      onClick={(e) =>
        dialogRef.current &&
        !isClickInsideRectangle(e, dialogRef?.current) &&
        handleCloseModal()
      }
    >
      <h3>{title}</h3>
      <div className="modal-body__content">{children}</div>

      <ButtonControl
        handleClick={handleCloseModal}
        aria-label="Close dialog"
        className="modal-body__close-button"
        label={"Close"}
      />
    </dialog>
  );
};

export default Dialog;
