import * as React from 'react';
import classNames from 'classnames';
import Box from '@material-ui/core/Box';

import * as theme from './result-message-box.scss';

interface ResultMessageBoxProps {
    type: 'success' | 'error' | 'warning';
    message: string;
}

const ResultMessageBox: React.SFC<ResultMessageBoxProps> = ({ message, type }) => {
    return (
        <Box mt={2} className={classNames(theme.resultMessageBox, theme[type])}>
            <span>{message}</span>
        </Box>
    );
};

export default ResultMessageBox;
