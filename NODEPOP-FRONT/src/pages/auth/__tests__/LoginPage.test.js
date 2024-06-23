import React from 'react';
import { render } from '@testing-library/react';
import LoginPage from '../LoginPage';
import { Provider } from 'react-redux';

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
});
