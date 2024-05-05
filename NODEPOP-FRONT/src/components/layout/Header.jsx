import PropTypes from "prop-types";
import clsx from "clsx";
import WallapopLogo from "../../assets/wallapop.svg";
import AuthButton from "../../pages/auth/components/AuthButton";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";

export default function Header({ className }) {
  return (
    <header className={clsx("header", className)}>
      <Link to="/">
        <div className="header-logo">
          <img src={WallapopLogo} width={52} height={52} />
        </div>
      </Link>
      <nav className="header-nav">
        <NavLink to="/adverts/new">New Advert</NavLink>|
        <NavLink to="/adverts" end>
          Existing adverts
        </NavLink>
        &nbsp;&nbsp;&nbsp;
        <AuthButton className="header-button" />
      </nav>
    </header>
  );
}

Header.propTypes = {
  className: PropTypes.string,
};
