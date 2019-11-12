import * as React from 'react';
import { History, LocationState } from 'history';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { passwordRecovery } from '../modules/authentication/api';
import ResultMessageBox from '../widgets/result-message-box';
import { errorMapper, successMapper } from '../utils/messages-mapper';
import { isEmail } from '../utils/validators';

import * as theme from './password-recovery.scss';

interface PasswordResetProps {
    history: History<LocationState>;
}

interface PasswordResetState {
    email: string;
    emailFieldError: string;
    submitLoading: boolean;
    submitError: string;
    passwordResetProcessed: boolean;
}

export default class PasswordReset extends React.Component<PasswordResetProps, PasswordResetState> {

    state: PasswordResetState = {
        email: '',
        emailFieldError: '',
        submitLoading: false,
        submitError: '',
        passwordResetProcessed: false
    };

    handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [field]: event.target.value } as Pick<PasswordResetState, any>);
    }

    handleSubmit = () => {
        const { email } = this.state;
        if (email) {
            if (!isEmail(email)) {
                this.setState({ emailFieldError: errorMapper.EMAIL_INVALID });
                return;
            }

            this.setState({ submitLoading: true, emailFieldError: '', submitError: '' }, async () => {
                const response = await passwordRecovery(email);
                if (response.success) {
                    this.setState({ passwordResetProcessed: true, submitLoading: false });
                } else {
                    this.setState({ submitLoading: false, submitError: errorMapper[response.error] });
                }
            });
        } else {
            this.setState({ emailFieldError: errorMapper.PASSWORD_RESET_MISSING_EMAIL });
        }
    }

    render() {
        const { submitLoading, passwordResetProcessed, submitError, emailFieldError } = this.state;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={theme.paper}>
                    <Avatar className={theme.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Password recovery
                    </Typography>
                    <p>Enter your e-mail address below. We'll send an email within a few minutes so you can create a new password.</p>
                    {submitError && <ResultMessageBox type="error" message={submitError} />}
                    {submitLoading && <div className={theme.loadingBox}><CircularProgress /></div>}
                    {passwordResetProcessed && <ResultMessageBox type="success" message={successMapper.PASSWORD_RESET_EMAIL_SENT} />}
                    {!passwordResetProcessed &&
                        <div className={theme.form}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        autoComplete="email"
                                        error={emailFieldError !== ''}
                                        helperText={emailFieldError !== '' && emailFieldError}
                                        onChange={this.handleInputChange('email')}
                                    />
                                </Grid>
                            </Grid>
                            <div className={theme.submitWrapper}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleSubmit}
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    }
                </div>
            </Container>
        );
    }
}