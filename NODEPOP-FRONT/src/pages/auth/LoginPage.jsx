import { useState } from "react";
import Button from "../../components/shared/Button";
import FormField from "../../components/shared/FormField";
import "./LoginPage.css";
import { useDispatch, useSelector } from "react-redux";
import { authLogin, uiResetError } from "../../store/actions";
import { getUi } from "../../store/selectors";

export default function LoginPage() {
  const dispatch = useDispatch();
  const { pending: isFetching, error } = useSelector(getUi);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [isChecked, setIsChecked] = useState(true);

  const handleInputChange = (event) => {
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCheckboxChange = () => {
    setIsChecked((currentIsChecked) => !currentIsChecked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(authLogin(formValues, isChecked));
  };

  const resetError = () => dispatch(uiResetError());

  const { email, password } = formValues;
  const buttonDisabled = !email || !password;
  return (
    <div className="loginPage">
      <h1 className="loginPage-title">Log in to Nodepop</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="email"
          label="email"
          className="loginForm-field"
          value={email}
          onChange={handleInputChange}
        />
        <FormField
          type="password"
          name="password"
          label="password"
          className="loginForm-field"
          value={password}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          $variant="primary"
          disabled={buttonDisabled}
          className="loginForm-submit"
        >
          Log in
        </Button>
        <FormField
          type="checkbox"
          name="remember"
          label="Remember me if you restart the browser"
          className="loginForm-field"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </form>
      {error && (
        <div className="loginPage-error" onClick={resetError}>
          {error.message}
        </div>
      )}
    </div>
  );
}
