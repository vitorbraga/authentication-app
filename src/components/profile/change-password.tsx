import * as React from 'react';
import Typography from '@material-ui/core/Typography';

import * as theme from './change-password.scss';

export default class ChangePassword extends React.Component<{}, {}> {
    render() {
        return (
            <div className={theme.contentBox}>
                <Typography component="h2" variant="h5">
                    Change Password
                </Typography>
            </div>
        );
    }
}
