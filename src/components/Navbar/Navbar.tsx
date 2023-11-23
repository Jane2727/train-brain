import { ColorSchemeToggleProps } from "../../models";
import ColorSchemeToggle from "../ColorSchemeToggle/ColorSchemeToggle";

const Navbar = ({ isDark, setDarkTheme }: ColorSchemeToggleProps) => {
  return (
    <>
      <ColorSchemeToggle isDark={isDark} setDarkTheme={setDarkTheme} />
    </>
  );
};

export default Navbar;
