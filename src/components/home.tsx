import * as React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <h2>Welcome to React Router Tutorial</h2>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <ul className="navbar-nav mr-auto">
                        <li><Link to={'/'} className="nav-link">Home</Link></li>
                        <li><Link to={'/login'} className="nav-link">Login</Link></li>
                        <li><Link to={'/about'} className="nav-link">About</Link></li>
                        <li><Link to={'/register'} className="nav-link">Register</Link></li>
                        <li><Link to={'/profile'} className="nav-link">Profile</Link></li>
                    </ul>
                </nav>
            </div>
        );
    }
}
