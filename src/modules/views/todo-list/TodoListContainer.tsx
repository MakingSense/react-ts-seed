import { connect } from 'react-redux';

import { IRootState, todoState } from '../../state-mgmt/rootState';
import TodoList from './TodoList';

export const mapStateToProps = (state: IRootState) => ({
  todoMap: state.todo.todoMap
});

export const mapDispatchToProps = dispatch => ({
  fetchTodoList: () => dispatch(todoState.actions.fetchStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
