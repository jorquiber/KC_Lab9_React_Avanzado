import { useState } from "react";
import Button from "../../components/shared/Button";
import { login } from "./service";

export default function LoginPage({ onLogin }) {
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

    const response = await login(formValues);

    onLogin();
  };

  const { email: email, password } = formValues;
  const buttonDisabled = !email || !password;
  return (
    <div>
      <h1>Log in to Nodepop</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" value={email} onChange={handleChange} />
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <Button type="submit" $variant="primary" disabled={buttonDisabled}>
          Login
        </Button>
      </form>
    </div>
  );
}
