import React from 'react';
import { render, RenderResult, fireEvent } from '@testing-library/react';

import Login, { ILoginProps } from './Login';

describe('Login Component', () => {
  let wrapper: RenderResult;
  let props: ILoginProps;

  beforeEach(() => {
    props = {
      login: jest.fn()
    };
    wrapper = render(<Login {...props} />);
  });

  it('should render', () => {
    expect(wrapper.baseElement).toMatchSnapshot();
  });

  it('should set username and password and login', () => {
    const username = 'username';
    const password = 'password';
    fireEvent.change(wrapper.getByTestId('login-username'), { target: { value: username } });
    fireEvent.change(wrapper.getByTestId('login-password'), { target: { value: password } });
    fireEvent.click(wrapper.getByTestId('login-btn'));
    expect(props.login).toBeCalledWith(username, password);
  });
});
