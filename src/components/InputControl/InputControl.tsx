import { InputControlProps } from "../../models";
import "./InputControl.css";

const InputControl = ({
  value,
  handleChange,
  type = "text",
  id,
  className,
}: InputControlProps<string>): JSX.Element => {
  const classNames = className ? `input ${className}` : "input";

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
