import * as React from 'react';

export default class Profile extends React.Component<{}, never> {

    componentDidMount() {
        console.log('Fetch for user details');
    }

    render() {
        return <h1>profile: private place</h1>;
    }
}
