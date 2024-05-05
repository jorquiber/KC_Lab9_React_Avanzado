import PropTypes from "prop-types";
import "./Button.css";
import clsx from "clsx";
import { Link } from "react-router-dom";

const Button = ({
  variant = "primary",
  disabled = false,
  onClick,
  children,
  className,
  to,
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  if (to) {
    return (
      <Link to={to}>
        <button
          className={clsx("button", `button-${variant}`, className)}
          onClick={handleClick}
          disabled={disabled}
        >
          {children}
        </button>
      </Link>
    );
  }

  return (
    <button
      className={clsx("button", `button-${variant}`, className)}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary"]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
