import React from 'react';
import { shallow } from 'enzyme';
import { create } from 'react-test-renderer';

import { getTodo_1 } from '../../../test/entities';
import TodoList from './TodoList';

describe('TodoList Component', () => {
  let Component;
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      todoMap: { [getTodo_1().id]: getTodo_1() },
      fetchTodoList: jest.fn()
    };
    Component = shallow(<TodoList {...defaultProps} />);
  });

  describe('render', () => {
    it('should render with default props', () => {
      expect(create(Component).toJSON()).toMatchSnapshot();
    });
  });
});
