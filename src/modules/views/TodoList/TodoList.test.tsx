import React from 'react';
import { render, RenderResult } from '@testing-library/react';

import { getTodo_1 } from '../../../test/entities';
import TodoList, { ITodoListProps } from './TodoList';

describe('TodoList Component', () => {
  let wrapper: RenderResult;
  let props: ITodoListProps;

  beforeEach(() => {
    props = {
      todoMap: { [getTodo_1().id]: getTodo_1() },
      fetchTodoList: jest.fn()
    };
    wrapper = render(<TodoList {...props} />);
  });

  it('should render', () => {
    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
