import * as React from 'react';
import { shallow } from 'enzyme';
import { create } from 'react-test-renderer';

import Login from './Login';

describe('Login Component', () => {
  let Component;
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      login: jest.fn()
    };
    Component = shallow(<Login {...defaultProps} />);
  });

  describe('render', () => {
    it('should render with default props', () => {
      expect(create(Component).toJSON()).toMatchSnapshot();
    });
  });

  describe('methods', () => {
    it('should set username and password and login', () => {
      const username = 'username';
      const password = 'password';
      Component.find('input[type="text"]').simulate('change', { target: { value: username } });
      Component.find('input[type="password"]').simulate('change', { target: { value: password } });
      expect(Component.instance().state).toEqual({ username, password });
      Component.find('button').simulate('click');
      expect(defaultProps.login).toBeCalledWith(username, password);
    });
  });
});
