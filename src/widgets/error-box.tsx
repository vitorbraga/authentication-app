import * as React from 'react';
import Box from '@material-ui/core/Box';

import * as theme from './error-box.scss';

interface ErrorBoxProps {
    errorMessage: string;
}

const ErrorBox: React.SFC<ErrorBoxProps> = ({ errorMessage }) => {
    return (
        <Box mt={2} className={theme.loginErrorBox}>
            <span>{errorMessage}</span>
        </Box>
    );
};

export default ErrorBox;
