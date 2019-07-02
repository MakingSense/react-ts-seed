import React from 'react';
import { mount } from 'enzyme';
import { create } from 'react-test-renderer';

import { getTodo_1 } from '../../../test/entities';
import TodoList from './TodoList';

describe('TodoList Component', () => {
  let Component;
  let props;

  beforeEach(() => {
    global.console.error = () => {/** */};
    props = {
      todoMap: { [getTodo_1().id]: getTodo_1() },
      fetchTodoList: jest.fn()
    };
    Component = mount(<TodoList {...props} />);
  });

  it('should render with default props', () => {
    expect(create(Component).toJSON()).toMatchSnapshot();
  });
});
