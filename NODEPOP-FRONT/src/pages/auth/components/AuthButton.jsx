import Button from "../../../components/shared/Button";
import { useAuth } from "../context";
import { logout } from "../service";
import PropTypes from "prop-types";

function AuthButton({ className }) {
  const { isLogged, onLogout } = useAuth();

  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };

  return isLogged ? (
    <Button onClick={handleLogoutClick} className={className}>
      Logout
    </Button>
  ) : (
    <Button variant="secondary" className={className} to="/login">
      Login
    </Button>
  );
}

AuthButton.propTypes = {
  className: PropTypes.string,
};

export default AuthButton;
