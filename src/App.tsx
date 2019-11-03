import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import Home from './components/Home';
import About from './components/About';
import LoginContainer from './containers/LoginContainer';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import Register from './components/register';
import RegisterSuccess from './components/register-success';
import PrivateRoute from './utils/private-route';
import ProfileContainer from './containers/ProfileContainer';
import PasswordRecovery from './components/password-reset';
import PasswordResetEmailSent from './components/password-reset-email-sent';
import ChangePassword from './components/change-password';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#00BCD4',
            light: '#B2EBF2',
            dark: '#0097A7',
            contrastText: 'white'
        },
        secondary: {
            main: '#ccc',
            light: '#e35183',
            dark: '#78002e'
        }
        // error: will use the default color
    }
});

export default class App extends React.Component<{}, {}> {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router>
                        <MuiThemeProvider theme={theme}>
                            <div style={{ width: '100%', height: '100%' }}>
                                <Switch>
                                    <Route exact path="/" component={Home} />
                                    <Route path="/login" component={LoginContainer} />
                                    <Route path="/register" component={Register} />
                                    <PrivateRoute path="/profile" component={ProfileContainer} />
                                    <Route path="/register-success" component={RegisterSuccess} />
                                    <Route path="/about" component={About} />
                                    <Route path="/password-reset" component={PasswordRecovery} />
                                    <Route path="/password-reset-email-sent" component={PasswordResetEmailSent} />
                                    <Route path="/change-password" component={ChangePassword} />
                                </Switch>
                            </div>
                        </MuiThemeProvider>
                    </Router>
                </PersistGate>
            </Provider>
        );
      }
}
