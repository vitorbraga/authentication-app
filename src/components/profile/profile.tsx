import * as React from 'react';
import { History, LocationState } from 'history';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Menu from '@material-ui/core/Menu';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import { User } from '../../modules/user/model';
import { getUser } from '../../modules/user/api';
import AccountOverview from './account-overview';
import PersonalInfo from './personal-info';
import ChangePassword from './change-password';

import * as theme from './profile.scss';
import { TypographyProps } from '@material-ui/system';

interface ProfileProps {
    authToken: string | null;
    userId: number | null;
    setAuthenticationToken: (authToken: string | null) => void;
    setUserId: (userId: number | null) => void;
    history: History<LocationState>;
}

interface ProfileState {
    loading: boolean;
    user: User | null;
    anchorEl: Element | null;
    tabValue: number;
}

interface TabPanelProps extends TypographyProps {
    value: number;
    index: number;
    children: React.ReactNode;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            className={theme.tabPanel}
            {...other}
        >
            <Box p={1} pl={2}>{children}</Box>
        </Typography>
    );
};

const CustomTab = withStyles(() => ({
    selected: { color: '#00BCD4' },
    wrapper: { alignItems: 'start' }
}))(Tab);

export default class Profile extends React.Component<ProfileProps, ProfileState> {

    state: ProfileState = {
        loading: false,
        user: null,
        anchorEl: null,
        tabValue: 0
    };

    componentDidMount = () => {
        const { authToken, userId } = this.props;

        this.setState({ loading: true }, async () => {
            if (userId && authToken) {
                const response = await getUser(userId, authToken);
                if (response.success) {
                    this.setState({ user: response.user, loading: false });
                } else {
                    console.log('error fetching user', response.error);
                }
            }
        });
    }

    a11yProps = (index: number) => ({ id: `vertical-tab-${index}`});

    handleOpenAccountMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleCloseAccountMenu = () => {
        this.setState({ anchorEl: null });
    }

    handleLogout = () => {
        this.props.setAuthenticationToken(null);
        this.props.setUserId(null);

        this.props.history.push('/');
    }

    handleChangeTab = (event: any, newValue: number) => {
        this.setState({ tabValue: newValue });
    }

    render() {
        const { loading, user, anchorEl, tabValue } = this.state;

        return (
            <div className={theme.fullContainer}>
                <CssBaseline />
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <div className={theme.hiddenSpan} />
                        {user !== null &&
                            <div>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    color="inherit"
                                    onClick={this.handleOpenAccountMenu}
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={!!anchorEl}
                                    onClose={this.handleCloseAccountMenu}
                                >
                                    <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                                </Menu>
                            </div>
                        }
                    </Toolbar>
                </AppBar>
                <div className={theme.centerContent}>
                    <Container component="main" maxWidth="md" className={theme.mainContainer}>
                        <Paper className={theme.mainPaper}>
                            {loading &&
                                <div className={theme.loadingBox}>
                                    <CircularProgress size={80} />
                                </div>
                            }
                            {user !== null &&
                                <div className={theme.root}>
                                    <Tabs
                                        orientation="vertical"
                                        variant="scrollable"
                                        value={tabValue}
                                        onChange={this.handleChangeTab}
                                        className={theme.verticalTabs}
                                        centered={false}
                                        indicatorColor="primary"
                                    >
                                        <CustomTab label="Account overview" className={theme.tab} {...this.a11yProps(0)} />
                                        <CustomTab label="Personal information" {...this.a11yProps(1)} />
                                        <CustomTab label="Change password" {...this.a11yProps(2)} />
                                    </Tabs>
                                    <TabPanel value={tabValue} index={0}>
                                        <AccountOverview user={user} />
                                    </TabPanel>
                                    <TabPanel value={tabValue} index={1}>
                                        <PersonalInfo user={user} />
                                    </TabPanel>
                                    <TabPanel value={tabValue} index={2}>
                                        <ChangePassword />
                                    </TabPanel>
                                </div>
                            }
                        </Paper>
                    </Container>
                </div>
            </div>
        );
    }
}
