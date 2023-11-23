import { ButtonControlProps } from "../../models";
import "./ButtonControl.css";

const ButtonControl = ({
  label,
  handleClick,
  isDisabled = false,
  type = "button",
  className,
}: ButtonControlProps): JSX.Element => {
  const classNames = className ? `button ${className}` : "button";

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={isDisabled}
      className={classNames}
    >
      {label}
    </button>
  );
};

export default ButtonControl;
