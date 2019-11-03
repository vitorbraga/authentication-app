import * as React from 'react';
import * as qs from 'query-string';
import { RouteComponentProps } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { errors } from '../utils/error-mapper';
import { checkValidPasswordResetToken } from '../modules/authentication/api';
import ResultMessageBox from '../widgets/result-message-box';

import * as theme from './change-password.scss';

interface MatchParams {
    token: string;
    u: string;
}

interface ChangePasswordProps extends RouteComponentProps<MatchParams> {
}

interface ChangePasswordState {
    newPassword: string;
    newPasswordRepeat: string;
    submitLoading: boolean;
    submitError: string | null | undefined;
    tokenIsValid: boolean | undefined;
}

export default class ChangePassword extends React.Component<ChangePasswordProps, ChangePasswordState> {

    state: ChangePasswordState = {
        newPassword: '',
        newPasswordRepeat: '',
        submitLoading: false,
        submitError: '',
        tokenIsValid: undefined
    };

    componentDidMount = async () => {
        const parsedUrl = qs.parse(this.props.location.search);
        const token = parsedUrl.token;
        const userId = parsedUrl.u;
        if (token && userId) {
            const response = await checkValidPasswordResetToken(token.toString(), userId.toString());
            console.log(response.error);
            this.setState({ tokenIsValid: response.success });
        } else {
            // TODO token or userId not found in URL
            // TODO show errors
        }
    }

    handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [field]: event.target.value } as Pick<ChangePasswordState, any>);
    }

    handleSubmit = () => {
        const { newPassword, newPasswordRepeat } = this.state;

        if (!(newPassword && newPasswordRepeat)) {
            this.setState({ submitError: errors.PASSWORD_RESET_REQUIRED_FIELDS });
            return;
        }

        if (newPassword !== newPasswordRepeat) {
            this.setState({ submitError: errors.PASSWORDS_DO_NOT_MATCH });
            return;
        }

        // TODO request to change password (need to implement backend first)
        console.log('change password', newPassword, newPasswordRepeat);
    }

    render() {
        const { submitError, submitLoading, tokenIsValid } = this.state;

        if (tokenIsValid === undefined) {
            return null;
        } else if (tokenIsValid) {
            return (
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={theme.paper}>
                        <Avatar className={theme.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Change password
                        </Typography>
                        {submitError && <ResultMessageBox type="error" message={submitError} />}
                        {submitLoading && <div className={theme.loadingBox}><CircularProgress /></div>}
                        <div className={theme.form}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="newPassword"
                                label="New password"
                                type="password"
                                id="newPassword"
                                onChange={this.handleInputChange('newPassword')}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                name="newPasswordRepeat"
                                label="Repeat new password"
                                type="password"
                                id="newPasswordRepeat"
                                onChange={this.handleInputChange('newPasswordRepeat')}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={this.handleSubmit}
                                className={theme.submit}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </Container>
            );
        } else {
            return <div>Token is not valid. Try again.</div>;
        }
    }
}
