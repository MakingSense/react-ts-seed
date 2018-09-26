import * as React from 'react';
import { shallow } from 'enzyme';
import { create } from 'react-test-renderer';

import Login from './Login';

describe('Avatar Component', () => {
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
});
