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
import { TypographyProps } from '@material-ui/system';
import { User } from '../../modules/user/model';
import { getUser } from '../../modules/user/api';
import AccountOverview from './account-overview';
import PersonalInfo from './personal-info';
import ChangePassword from './change-password';
import ResultMessageBox from '../../widgets/result-message-box';
import { errorMapper } from '../../utils/messages-mapper';

import * as theme from './profile.scss';

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

interface ProfileProps {
    authToken: string | null;
    userId: number | null;
    user: User | null;
    setUser: (user: User | null) => void;
    userLogout: () => void;
    history: History<LocationState>;
}

interface ProfileState {
    loading: boolean;
    anchorEl: Element | null;
    tabValue: number;
    error: string;
}

interface TabPanelProps extends TypographyProps {
    value: number;
    index: number;
    children: React.ReactNode;
}

type TabsKeys = '' | 'personal-info' | 'change-password';

const tabsMapper = {
    '': 0,
    'personal-info': 1,
    'change-password': 2
};

function getTabValue(): number {
    const url = location.href;
    const hashtagIndex = url.indexOf('#');
    if (hashtagIndex !== -1) {
        const key = url.substring(hashtagIndex + 1, url.length) as TabsKeys;
        return tabsMapper[key || ''];
    }

    return 0;
}

export default class Profile extends React.Component<ProfileProps, ProfileState> {

    state: ProfileState = {
        loading: false,
        anchorEl: null,
        tabValue: getTabValue(),
        error: ''
    };

    componentDidMount() {
        const { authToken, userId, setUser } = this.props;

        this.setState({ loading: true }, async () => {
            if (userId && authToken) {
                const response = await getUser(userId, authToken);
                if (response.success) {
                    setUser(response.user);
                    this.setState({ loading: false });
                } else {
                    this.setState({ loading: false, error: errorMapper.PROFILE_ERROR_FETCHING_USER_DATA });
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
        this.props.userLogout();
        this.props.history.push('/');
    }

    handleChangeTab = (event: any, newValue: number) => {
        this.setState({ tabValue: newValue });
    }

    handleClick = (tabName: string) => () => {
        this.props.history.push(`/profile#${tabName}`);
    }

    render() {
        const { setUser, user } = this.props;
        const { loading, anchorEl, tabValue, error } = this.state;

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
                            {error &&  <ResultMessageBox type="error" message={error} />}
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
                                        <CustomTab label="Account overview" {...this.a11yProps(0)} onClick={this.handleClick('')} />
                                        <CustomTab label="Personal information" {...this.a11yProps(1)} onClick={this.handleClick('personal-info')} />
                                        <CustomTab label="Change password" {...this.a11yProps(2)} onClick={this.handleClick('change-password')} />
                                    </Tabs>
                                    <TabPanel value={tabValue} index={0}>
                                        <AccountOverview user={user} />
                                    </TabPanel>
                                    <TabPanel value={tabValue} index={1}>
                                        <PersonalInfo user={user} authToken={this.props.authToken} onSetUser={setUser} />
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
