import { mapStateToProps, mapDispatchToProps } from './LoginContainer';

describe('LoginContainer', () => {
  it('should mapStateToProps, ', () => {
    expect(mapStateToProps({} as any)).toEqual({});
  });
  it('should mapDispatchToProps', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    expect(props).toEqual({
      login: expect.any(Function)
    });
  });
});
