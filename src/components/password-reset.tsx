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
import { passwordReset } from '../modules/authentication/api';
import ResultMessageBox from '../widgets/result-message-box';
import { errors } from '../utils/error-mapper';

import * as theme from './password-reset.scss';
import { isEmail } from '../utils/validators';

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
                this.setState({ emailFieldError: errors.EMAIL_INVALID });
                return;
            }

            this.setState({ submitLoading: true, emailFieldError: '', submitError: '' }, async () => {
                const response = await passwordReset(email);
                if (response.success) {
                    this.setState({ passwordResetProcessed: true, submitLoading: false });
                } else {
                    this.setState({ submitLoading: false, submitError: errors[response.error] });
                }
            });
        } else {
            this.setState({ emailFieldError: errors.PASSWORD_RESET_MISSING_EMAIL });
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
                    {passwordResetProcessed &&
                        <ResultMessageBox
                            type="success"
                            message="We sent a password reset link to your email address, which allows you to reset your password."
                        />
                    }
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
                </div>
            </Container>
        );
    }
}
