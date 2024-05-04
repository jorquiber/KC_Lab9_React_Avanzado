import clsx from "clsx";
import WallapopLogo from "../../assets/wallapop.svg";
import AuthButton from "../../pages/auth/components/AuthButton";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";

export default function Header({ className }) {
  return (
    <header className={clsx("header", className)}>
      <div className="header-logo">
        <img src={WallapopLogo} width={52} height={52} />
      </div>
      <nav className="header-nav">
        <AuthButton className="header-button" />
      </nav>
    </header>
  );
}
