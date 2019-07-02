import React from 'react';
import { mount } from 'enzyme';
import { create } from 'react-test-renderer';

import Login from './Login';

describe('Login Component', () => {
  let Component;
  let props;

  beforeEach(() => {
    global.console.error = () => {/** */};
    props = {
      login: jest.fn()
    };
    Component = mount(<Login {...props} />);
  });

  it('should render with default props', () => {
    expect(create(Component).toJSON()).toMatchSnapshot();
  });

  it('should set username and password and login', () => {
    const username = 'username';
    const password = 'password';
    Component.find('input[type="text"]').simulate('change', { target: { value: username } });
    Component.find('input[type="password"]').simulate('change', { target: { value: password } });
    Component.find('button').simulate('click');
    expect(props.login).toBeCalledWith(username, password);
  });
});
