import { useState } from "react";
import Button from "../../components/shared/Button";
import { login } from "./service";
import { useAuth } from "./context";
import FormField from "../../components/shared/FormField";
import "./LoginPage.css";
import storage from "../../utils/storage";
import { useNavigate, useLocation } from "react-router-dom";

export default function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { onLogin } = useAuth();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const [isChecked, setIsChecked] = useState(true);

  const handleInputChange = (event) => {
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleCheckboxChange = (event) => {
    setIsChecked((currentIsChecked) => !currentIsChecked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(formValues);
      onLogin();
      if (!isChecked) {
        storage.clear();
      }
      const to = location.state?.from || "/";
      navigate(to, { replace: true });
    } catch (error) {
      setError(error);
    }
  };

  const resetError = () => setError(null);

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
          label="Remember password if you restart the browser"
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
