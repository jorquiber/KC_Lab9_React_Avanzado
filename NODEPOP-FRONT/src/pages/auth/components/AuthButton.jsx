import Button from "../../../components/shared/Button";
import { logout } from "../service";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getIsLogged } from "../../../store/selectors";
import { authLogout } from "../../../store/actions";

function AuthButton({ className }) {
  const isLogged = useSelector(getIsLogged);
  const dispatch = useDispatch();

  const handleLogoutClick = async () => {
    await logout();
    dispatch(authLogout());
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
