import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../modules/authentication/helpers';
import { AppState } from '../store';
import { authToken } from '../modules/authentication/selector';

const PrivateRoute = ({ component, authToken, ...rest }: any) => {
    const authenticated = isAuthenticated(authToken);
    console.log('authtoej', authenticated, authToken);
    const routeComponent = (props: any) => (
        authenticated
            ? React.createElement(component, props)
            : <Redirect to={{pathname: '/login'}}/>
    );

    return <Route {...rest} render={routeComponent}/>;
};

const mapStateToProps = (state: AppState, ownProps: any) => ({
    authToken: authToken(state.authentication)
});

export default connect(mapStateToProps)(PrivateRoute);
