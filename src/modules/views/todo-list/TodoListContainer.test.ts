import { mapStateToProps, mapDispatchToProps } from './TodoListContainer';

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
});
