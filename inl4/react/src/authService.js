// import axios with the alias 'http'. 
import http from './http';

const jwt_decode = require('jwt-decode');
// ...

class AuthService {

    // the decoded token if the user has been authenticated, carrying information about the user.
    user;

    constructor() {
        this.user = JSON.parse(localStorage.getItem('token')) || { loggedIn: false}
        // this.user = JSON.parse(localStorage.getItem('user'));
        // perform any logic upon application startup here...
    }
    
    // use this method to catch http errors. 
    handleError(error) {
        throw error
    }

    // convenience method to get authentication state for a user, which should include the 'user' class property; 
    // this method is used in the <App> component.
    getAuthState() {

        return {
            ...this.user
        };
    }

    login(credentials) {
        return http.post('api/auth', {body: credentials})
            .then(res => {
                console.log(res.data.token)
                this.user.token = res.data.token
                this.user.loggedIn = true;
                localStorage.setItem('token', JSON.stringify(this.user))
                console.log(this.user)
            })
            .catch(error => this.handleError(error))
            
        // invoke the relevant API route for authenticating the user with the given credentials and return a Promise
        // that fulfills with authentication state.
        // 
        // Make sure to handle a successful authentication by storing and also decoding the returned token, as well as
        // catching http errors. 
        
        // return ...
    }
    
    logout() {
        this.user = {
            loggedIn: false
        }
        localStorage.clear()
        console.log(this.user)
    }
    
    getResource(resource) {
        return http.get(`/api/${resource}`, {headers: {Authorization: `Bearer ${this.user.token}`}})
            .then(res => {
                return res.data.friends
            })
            .catch(error => {
                this.handleError(error.response)
            })
    }
}

export default new AuthService();