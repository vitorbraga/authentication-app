import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { User } from '../../modules/user/model';

import * as theme from './personal-info.scss';

interface PersonalInfoProps {
    user: User;
}

interface PersonalInfoState {
    firstName: string;
    lastName: string;
}

export default class PersonalInfo extends React.Component<PersonalInfoProps, PersonalInfoState> {

    state: PersonalInfoState = {
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName
    };

    handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [field]: event.target.value } as Pick<PersonalInfoState, any>);
    }

    handleSubmit = () => {
        console.log('handleSubmit');
    }

    render() {
        const { firstName, lastName } = this.state;

        return (
            <div className={theme.contentBox}>
                <Typography component="h2" variant="h5">
                    Personal info
                </Typography>
                <div className={theme.formContent}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} style={{ marginTop: '20px' }}>
                            <TextField
                                id="first-name"
                                label="First Name"
                                variant="outlined"
                                required
                                value={firstName}
                                margin="normal"
                                // error={!!firstNameValidationError}
                                // helperText={firstNameValidationError && firstNameValidationError.errorMessage}
                                onChange={this.handleInputChange('firstName')}
                            />
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: '20px' }}>
                            <TextField
                                key="last-name"
                                variant="outlined"
                                required
                                fullWidth
                                label="Last Name"
                                value={lastName || ''}
                                // error={!!lastNameValidationError}
                                // helperText={lastNameValidationError && lastNameValidationError.errorMessage}
                                onChange={this.handleInputChange('lastName')}
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
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}
