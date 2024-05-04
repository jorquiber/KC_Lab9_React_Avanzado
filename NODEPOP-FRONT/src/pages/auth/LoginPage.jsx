import { useState } from "react";
import Button from "../../components/shared/Button";
import { login } from "./service";
import { useAuth } from "./context";
import FormField from "../../components/shared/FormField";
import "./LoginPage.css";
import storage from "../../utils/storage";

export default function LoginPage() {
  const { onLogin } = useAuth();
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

  const handleCheckboxChange = (event) => {
    setIsChecked((currentIsChecked) => !currentIsChecked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(formValues);

    onLogin();
    if (!isChecked) {
      storage.clear();
    }
  };

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
    </div>
  );
}
