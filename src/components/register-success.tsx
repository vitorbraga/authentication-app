import * as React from 'react';

export default class RegisterSuccess extends React.Component<{}, never> {

    render() {
        return (
            <div>
                <h1>Register success</h1>
                <p>Will have an image, thanks for registering, link to login</p>
                <p>It can also have some message "check your email" to activate</p>
            </div>
        );
    }
}
