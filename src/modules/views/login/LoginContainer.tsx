import { connect } from 'react-redux';

import { IRootState, authState } from '../../state-mgmt/rootState';
import Login from './Login';

export const mapStateToProps = (state: IRootState) => ({
  //
});

export const mapDispatchToProps = dispatch => ({
  login: (username: string, password: string) => dispatch(authState.actions.start(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
