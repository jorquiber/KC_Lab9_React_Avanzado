import { useState } from "react";
import Button from "../../components/shared/Button";
import { login } from "./service";
import { useAuth } from "./context";
import FormField from "../../components/shared/FormField";
import "./LoginPage.css";

export default function LoginPage() {
  const { onLogin } = useAuth();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormValues((currentFormValues) => ({
      ...currentFormValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(formValues);

    onLogin();
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
          onChange={handleChange}
        />
        <FormField
          type="password"
          name="password"
          label="password"
          className="loginForm-field"
          value={password}
          onChange={handleChange}
        />
        <Button
          type="submit"
          $variant="primary"
          disabled={buttonDisabled}
          className="loginForm-submit"
        >
          Log in
        </Button>
      </form>
    </div>
  );
}
