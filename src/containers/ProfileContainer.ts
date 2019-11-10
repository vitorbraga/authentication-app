import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from '../store';
import { authToken } from '../modules/authentication/selector';
import { setAuthToken } from '../modules/authentication/actions';
import Profile from '../components/profile/profile';
import { userId } from '../modules/user/selector';
import { setUserId } from '../modules/user/actions';

const mapStateToProps = (state: AppState) => ({
    authToken: authToken(state.authentication),
    userId: userId(state.user)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setAuthenticationToken: (authToken: string | null) => dispatch(setAuthToken(authToken)),
    setUserId: (userId: number | null) => dispatch(setUserId(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
