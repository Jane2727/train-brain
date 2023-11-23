import { useNavigate } from "react-router-dom";
import ButtonControl from "../components/ButtonControl/ButtonControl";
import { BUTTON_BACK_HOME, HOME_PATH } from "../constants";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const backToHomePage = () => {
    navigate(HOME_PATH);
  };

  return (
    <div className="not-found-container">
      <div className="not-found-title">Oooops. Page doesn't exist</div>
      <ButtonControl
        handleClick={backToHomePage}
        label={BUTTON_BACK_HOME}
        className="not-found-button"
      />
    </div>
  );
};

export default NotFoundPage;
