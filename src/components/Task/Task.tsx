import { RenderTaskProps } from "../../models";
import InputControl from "../InputControl/InputControl";
import "./Task.css";
import { useDispatch, useSelector } from "react-redux";
import { setInputValues } from "../../store/taskSlice";
import { taskInputValues } from "../../store/selectors";

const Task = ({ task }: RenderTaskProps) => {
  const inputValues = useSelector(taskInputValues);
  const dispatch = useDispatch();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    taskId: string
  ) => {
    const inpValue = e?.target?.value;
    let validValue = inpValue.match(/^-?\d*$/) && inpValue;
    let minus = inpValue === "--" && "-";

    dispatch(
      setInputValues({
        ...inputValues,
        [taskId]: { answer: validValue || minus || "" },
      })
    );
  };

  return (
    <>
      <label className="task-item__label" htmlFor={task.id.toString()}>
        <span>{`${task.firstSummand} ${task.firstSymbol} ${task.secondSummand} ${task.secondSymbol} ${task.thirdSummand}`}</span>
        <span>{"="}</span>
      </label>
      <InputControl
        isCorrect={inputValues[task.id]?.isCorrect}
        value={inputValues[task.id]?.answer ?? ""}
        handleChange={(e) => handleInputChange(e, task.id)}
        id={task.id.toString()}
      />
    </>
  );
};

export default Task;
