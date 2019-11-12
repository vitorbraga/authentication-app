import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from '../store';
import { authToken } from '../modules/authentication/selector';
import { setAuthToken } from '../modules/authentication/actions';
import Profile from '../components/profile/profile';
import { userId, user } from '../modules/user/selector';
import { setUserId, setUser } from '../modules/user/actions';
import { User } from '../modules/user/model';

const mapStateToProps = (state: AppState) => ({
    authToken: authToken(state.authentication),
    userId: userId(state.user),
    user: user(state.user)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setAuthenticationToken: (authToken: string | null) => dispatch(setAuthToken(authToken)),
    setUserId: (userId: number | null) => dispatch(setUserId(userId)),
    setUser: (user: User | null) => dispatch(setUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
