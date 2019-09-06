import { connect } from 'react-redux';

import { IRootState } from '../../state-mgmt/rootState';
import { authState } from '../../state-mgmt/auth';
import Login from './Login';

export const mapStateToProps = (state: IRootState) => ({
  //
});

export const mapDispatchToProps = dispatch => ({
  login: (username: string, password: string) => dispatch(authState.actions.start(username, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
