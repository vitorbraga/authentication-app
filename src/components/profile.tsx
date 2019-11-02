import * as React from 'react';
import { History, LocationState } from 'history';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

interface ProfileProps {
    authToken: string | null;
    setAuthenticationToken: (authToken: string | null) => void;
    setUserId: (userId: number | null) => void;
    history: History<LocationState>;
}

export default class Profile extends React.Component<ProfileProps, never> {

    componentDidMount() {
        console.log('Fetch for user details');
    }

    handleLogout = () => {
        this.props.setAuthenticationToken(null);
        this.props.setUserId(null);

        this.props.history.push('/');
    }

    render() {
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
            </Container>
        );
    }
}
