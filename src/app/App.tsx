import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import Home from './components/Home';
import About from './components/About';
import LoginContainer from './containers/LoginContainer';
import { Provider } from 'react-redux';
import { store, persistor } from './store';

export default class App extends React.Component<{}, {}> {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router>
                        <div>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route path="/login" component={LoginContainer} />
                                <Route path="/about" component={About} />
                            </Switch>
                        </div>
                    </Router>
                </PersistGate>
            </Provider>
        );
      }
}
