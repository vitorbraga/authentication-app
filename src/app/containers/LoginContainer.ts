import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Login from '../components/login';
import { AppState } from '../store';
import { authToken } from '../modules/authentication/selector';
import { setAuthToken } from '../modules/authentication/actions';

const mapStateToProps = (state: AppState, ownProps: any) => ({
    authToken: authToken(state.authentication)
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: any) => ({
    setAuthenticationToken: (authToken: string | null) => dispatch(setAuthToken(authToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
