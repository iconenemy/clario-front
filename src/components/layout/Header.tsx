import { ModeToggle } from "./ModeToggle";
import LanguageToggle from "./LanguageToggle";
import AuthSessionButton from "./AuthSessionButton";
import Notification from "@components/dashboard/layout/Notification";

const Header = () => {
  return (
    <div className="w-full py-4 px-20 fixed top-0 h-16 backdrop-blur z-50">
      <div className="w-full flex justify-end items-center gap-x-8">
        <Notification />
        <LanguageToggle />
        <ModeToggle />
        <AuthSessionButton />
      </div>
    </div>
  );
};

export default Header;
