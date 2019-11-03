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

import * as theme from './password-reset.scss';

interface PasswordResetProps {
    history: History<LocationState>;
}

interface PasswordResetState {
    email: string;
    submitLoading: boolean;
}

export default class PasswordReset extends React.Component<PasswordResetProps, PasswordResetState> {

    state: PasswordResetState = {
        email: '',
        submitLoading: false
    };

    handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [field]: event.target.value } as Pick<PasswordResetState, any>);
    }

    handleSubmit = () => {
        const { email } = this.state;
        if (email) {
            this.setState({ submitLoading: true }, async () => {
                const response = await passwordReset(email);
                if (response.success) {
                    console.log('created');
                    this.props.history.push('/password-reset-email-sent');
                } else {
                    this.setState({ submitLoading: false });
                    // show error
                }
            });
        } else {
            // show error
            console.log('Fill email');
        }
    }

    render() {
        const { submitLoading } = this.state;

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
                    {submitLoading && <div className={theme.loadingBox}><CircularProgress /></div>}
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
                                    // error={!!emailValidationError}
                                    // helperText={emailValidationError && emailValidationError.errorMessage}
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
