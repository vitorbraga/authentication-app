import * as React from 'react';
import classNames from 'classnames';
import { authenticate } from '../modules/authentication/api';

import * as theme from './login.scss';

interface LoginProps {
    authToken: string | null;
    setAuthenticationToken: (authToken: string | null) => void;
}

interface LoginState {
    username: string;
    password: string;
}

export default class Login extends React.Component<LoginProps, LoginState> {

    state: LoginState = {
        username: '',
        password: ''
    };

    handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [field]: event.target.value } as Pick<LoginState, any>);
    }

    handleSubmit = async () => {
        const result = await authenticate(this.state.username, this.state.password);
        if (result.success) {
            this.props.setAuthenticationToken(result.jwt);
        }
    }

    render() {
        return (
            <div className={classNames(theme.container, theme.fontStyle)}>
                <h1>login</h1>
                <input type="text" name="username" placeholder="username" onChange={this.handleInputChange('username')} value={this.state.username} />
                <br />
                <input type="password" name="password" placeholder="password" onChange={this.handleInputChange('password')} value={this.state.password} />
                <button onClick={this.handleSubmit}>Submit</button>
                <br />
                <span>JWT: {this.props.authToken}</span>
            </div>
        );
    }
}
