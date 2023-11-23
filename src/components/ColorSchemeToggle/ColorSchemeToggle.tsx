import Toggle from "react-toggle";
import "react-toggle/style.css";
import { ColorSchemeToggleProps } from "../../models";
import "./ColorSchemeToggle.css";

const ColorSchemeToggle = ({
  isDark,
  setDarkTheme,
}: ColorSchemeToggleProps) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDarkTheme(event.target.checked);
  };

  return (
    <div className="toggle-container">
      <Toggle
        checked={isDark}
        onChange={onChange}
        icons={{ checked: "🌙", unchecked: "🔆" }}
        aria-label="Dark mode"
      />
    </div>
  );
};

export default ColorSchemeToggle;
