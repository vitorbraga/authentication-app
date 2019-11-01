import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import Home from './components/Home';
import About from './components/About';
import LoginContainer from './containers/LoginContainer';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import Register from './components/register';
import Profile from './components/profile';
import RegisterSuccess from './components/register-success';

const theme = createMuiTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#ff4400'
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            light: '#0066ff',
            main: '#0044ff',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00'
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
                                    <Route path="/profile" component={Profile} />
                                    <Route path="/register-success" component={RegisterSuccess} />
                                    <Route path="/about" component={About} />
                                </Switch>
                            </div>
                        </MuiThemeProvider>
                    </Router>
                </PersistGate>
            </Provider>
        );
      }
}
