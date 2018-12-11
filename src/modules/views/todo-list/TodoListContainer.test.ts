import { mapStateToProps, mapDispatchToProps } from './TodoListContainer';
import { todoState } from '../../state-mgmt/todo';

describe('TodoListContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps({ todo: { todoMap: {} } } as any)).toEqual({ todoMap: {} });
  });
  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      fetchTodoList: expect.any(Function)
    });
  });

  it('should dispatch fetchTodoList action', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.fetchTodoList();
    expect(dispatch).toBeCalledWith(todoState.actions.fetchStart());
  });
});
