import React, { Component } from 'react';

class Login extends Component {
    state = {
        username: '',
        password: ''
    };

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
        // update the component state with a change to either the username or password.
    };

    onSubmit = e => {
        e.preventDefault();

        // calls the passed callback from the parent <App> component.
        this.props.onLogin(e.target.username.value, e.target.password.value);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input name="username" onChange={this.onChange} value={this.state.username} className="form-control" type="text"/>
                <input name="password" onChange={this.onChange} value={this.state.password} className="form-control" type="password"/>
                <button type="submit">LogIn</button>
            </form>
        )
    }
};

export default Login;