import Button from "../../../components/shared/Button";
import { useAuth } from "../context";
import { logout } from "../service";
import { Link } from "react-router-dom";

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

export default AuthButton;
