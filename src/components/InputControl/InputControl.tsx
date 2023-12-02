import { InputControlProps } from "../../models";
import "./InputControl.css";

const InputControl = ({
  value,
  handleChange,
  type = "text",
  id,
  className,
  isCorrect,
}: InputControlProps<string>): JSX.Element => {
  const correctClassName = isCorrect ? `input correct` : "input";
  const classNames = className
    ? `${correctClassName} ${className}`
    : correctClassName;

  return (
    <input
      type={type}
      id={id}
      onChange={handleChange}
      value={value}
      className={classNames}
    ></input>
  );
};

export default InputControl;
