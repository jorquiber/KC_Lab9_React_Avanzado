import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import LoginPage from '../LoginPage';
import { Provider } from 'react-redux';
import { authLogin } from '../../../store/actions';

jest.mock('../../../store/actions');

describe('LoginPage', () => {
  const state = { ui: { pending: false, error: null } };
  const store = {
    dispatch: () => {},
    getState: () => state,
    subscribe: () => {},
  };

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>,
    );

  test('snapshot', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test('should dispatch authLogin action', () => {
    const email = 'username';
    const password = 'password';
    const remember = true;
    renderComponent();

    const usernameInput = screen.getByRole('textbox', {
      name: /email/i,
    });
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', {
      name: /log in/i
    });
    const rememberCheckbox = screen.getByRole('checkbox', {
      name: /remember/i
    });

    expect(submitButton).toBeDisabled();

    // Simular el llenado del formulario
    fireEvent.change(usernameInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });

    expect(submitButton).toBeEnabled();

    //Desmarcar chechckbox de remember
    fireEvent.click(rememberCheckbox);

    expect(rememberCheckbox).not.toBeChecked();

    // Marcar checkbox de remember
    fireEvent.click(rememberCheckbox);

    expect(rememberCheckbox).toBeChecked();

    // Simular el envío del formulario
    fireEvent.click(submitButton);

    expect(authLogin).toHaveBeenCalledWith({ email, password }, remember);
  });
});

