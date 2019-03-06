import React from 'react';

import { storiesOf } from '@storybook/react';

import TodoList from '../modules/views/todo-list/TodoList';
import { getTodo_1 } from '../test/entities';

const todoMap = { [getTodo_1().id]: getTodo_1() };

storiesOf('TodoList', module)
  .add('with todoMap', () => (
    <TodoList todoMap={todoMap} fetchTodoList={() => {/** */}} />
  ));
