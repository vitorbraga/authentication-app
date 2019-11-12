import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { User } from '../../modules/user/model';
import { errorMapper, ValidationError, successMapper } from '../../utils/messages-mapper';
import { notUndefined } from '../../utils/common-helper';
import { updateUser } from '../../modules/user/api';
import ResultMessageBox from '../../widgets/result-message-box';

import * as theme from './personal-info.scss';

interface PersonalInfoProps {
    authToken: string | null;
    user: User;
    onSetUser: (user: User) => void;
}

interface PersonalInfoState {
    firstName: string;
    lastName: string;
    submitLoading: boolean;
    fieldErrors: ValidationError[];
    error: string;
    updateSuccess: boolean;
}

interface FormFields {
    firstName: string;
    lastName: string;
}

export default class PersonalInfo extends React.Component<PersonalInfoProps, PersonalInfoState> {

    state: PersonalInfoState = {
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        submitLoading: false,
        fieldErrors: [],
        error: '',
        updateSuccess: false
    };

    // TODO method that resets all the fields and set only one

    isValidBeforeSubmit(): ValidationError[] {
        const validationErrors = ['firstName', 'lastName'].map((item: keyof FormFields) => {
            if (!this.state[item]) {
                return { field: item, errorMessage: errorMapper.UPDATE_REQUIRED_FIELD };
            }

        }).filter(notUndefined);

        if (validationErrors.length > 0) {
            return validationErrors;
        }

        return [];
    }

    handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [field]: event.target.value, fieldErrors: [], updateSuccess: false } as Pick<PersonalInfoState, any>);
    }

    handleSubmit = () => {
        const { authToken, user, onSetUser } = this.props;
        const { firstName, lastName } = this.state;

        const validationErrors = this.isValidBeforeSubmit();
        if (validationErrors.length === 0 && authToken !== null) {
            this.setState({ submitLoading: true }, async () => {
                const registerResponse = await updateUser(user.id, { firstName, lastName }, authToken);
                if (registerResponse.success) {
                    onSetUser(registerResponse.user);
                    this.setState({ submitLoading: false, updateSuccess: true, error: '' });
                } else {
                    if (registerResponse.fields && registerResponse.fields.length > 0) {
                        const errors = registerResponse.fields.map((item) => {
                            return { field: item.field, errorMessage: errorMapper[Object.values(item.constraints)[0]] };
                        });
                        this.setState({ submitLoading: false, updateSuccess: false, fieldErrors: errors, error: '' });
                    } else if (registerResponse.error) {
                        this.setState({ submitLoading: false, updateSuccess: false, error: errorMapper[registerResponse.error], fieldErrors: [] });
                    }
                }
            });
        } else {
            this.setState({ fieldErrors: validationErrors, updateSuccess: false, error: '' });
        }
    }

    render() {
        const { error, fieldErrors, firstName, lastName, submitLoading, updateSuccess } = this.state;
        const firstNameValidationError = fieldErrors.find((item) => item.field === 'firstName');
        const lastNameValidationError = fieldErrors.find((item) => item.field === 'lastName');

        return (
            <div className={theme.contentBox}>
                <Typography component="h2" variant="h5">
                    Personal info
                </Typography>
                {submitLoading && <div className={theme.loadingBox}><CircularProgress /></div>}
                {updateSuccess && <ResultMessageBox type="success" message={successMapper.USER_UPDATED} />}
                {error && <ResultMessageBox type="error" message={error} />}
                <div className={theme.formContent}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                key="first-name"
                                label="First Name"
                                variant="outlined"
                                fullWidth
                                required
                                value={firstName}
                                error={!!firstNameValidationError}
                                helperText={firstNameValidationError && firstNameValidationError.errorMessage}
                                onChange={this.handleInputChange('firstName')}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                key="last-name"
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                required
                                value={lastName || ''}
                                error={!!lastNameValidationError}
                                helperText={lastNameValidationError && lastNameValidationError.errorMessage}
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