import React, { Component } from 'react';

import AuthService from './authService';
import Login from './Login';

class App extends Component {
    // get the initial state from AuthService. 
    state = AuthService.getAuthState();
    login = false;

    // ...

    login = (username, password) => {
        AuthService.login({username, password})
            .then(() => {
                this.setState(AuthService.getAuthState());
                this.login = false;
            })
    };

    logout = () => {
        AuthService.logout()
        this.setState(AuthService.getAuthState());
    };

    testApi() {
        AuthService.getResource('friends')
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    // ...

    render() {
        // complete the JSX code below to show the proper markup depending on whether or not the user has been authenticated.
        return (
            <div className="container">

                <p className="error">Login credentials were incorrect!</p>
                
                <div className="status">
                    <span>User ID:</span>
                    <button onClick={this.testApi}>Test API</button>
                    <button onClick={this.logout}>Logout</button>
                </div>
                
                <Login onLogin={this.login} />

            </div>
        );
    }
}

export default App;