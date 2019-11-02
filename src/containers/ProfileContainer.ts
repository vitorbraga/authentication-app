import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from '../store';
import { authToken } from '../modules/authentication/selector';
import { setAuthToken } from '../modules/authentication/actions';
import { setUserId } from '../modules/user/actions';
import Profile from '../components/profile';

const mapStateToProps = (state: AppState) => ({
    authToken: authToken(state.authentication)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setAuthenticationToken: (authToken: string | null) => dispatch(setAuthToken(authToken)),
    setUserId: (userId: number | null) => dispatch(setUserId(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
