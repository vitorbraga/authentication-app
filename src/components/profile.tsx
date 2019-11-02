import * as React from 'react';
import { History, LocationState } from 'history';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import { User } from '../modules/user/model';
import { getUser } from '../modules/user/api';

import * as theme from './profile.scss';

interface ProfileProps {
    authToken: string | null;
    userId: number | null;
    setAuthenticationToken: (authToken: string | null) => void;
    setUserId: (userId: number | null) => void;
    history: History<LocationState>;
}

interface ProfileState {
    loading: boolean;
    user: User | null;
}

export default class Profile extends React.Component<ProfileProps, ProfileState> {

    state: ProfileState = {
        loading: false,
        user: null
    };

    componentDidMount = () => {
        const { authToken, userId } = this.props;

        this.setState({ loading: true }, async () => {
            if (userId && authToken) {
                const response = await getUser(userId, authToken);
                if (response.success) {
                    this.setState({ user: response.user, loading: false });
                } else {
                    console.log('error fetching user', response.error);
                }
            }
        });
    }

    handleLogout = () => {
        this.props.setAuthenticationToken(null);
        this.props.setUserId(null);

        this.props.history.push('/');
    }

    render() {
        const { loading, user } = this.state;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={this.handleLogout}
                >
                    Logout
                </Button>
                <div>
                    {loading && <div className={theme.loadingBox}><CircularProgress /></div>}
                    {user && <div>
                            <div>{user.id}</div>
                            <div>{user.email}</div>
                            <div>{user.firstName}</div>
                            <div>{user.lastName}</div>
                            <div>{user.role}</div>
                            <div>{user.createdAt}</div>
                            <div>{user.updatedAt}</div>
                        </div>
                    }
                </div>
            </Container>
        );
    }
}
