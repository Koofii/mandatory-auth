import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


const jwt_decode = require('jwt-decode');

// ...

interface AuthResponse {
  token: string;
}

interface User {
  sub: string;
  name: string;
}

// ...

@Injectable()
export class AuthService {

  // the decoded token if the user has been authenticated, carrying information about the user.
  _user: User;
  _error;

  // inject the HttpClient service. 
  constructor(private http: HttpClient) {
    // perform any logic upon application startup here...
    this._user = JSON.parse(localStorage.getItem('user'))
  }

  // ...
  // The following computed properties may come in handy in the markup in your template...
  get user() {
    return this._user;
  }

  get authenticated() {
    return this._user !== undefined;
  }

  // use this method to catch http errors. 
  handleError(error: HttpErrorResponse) {
    return Observable.throw({
      error: error.error
    });
  }

  login(credentials): Observable<User> {

    return this.http.post<AuthResponse>('api/auth', credentials)
      .map(data => {
        this._user = jwt_decode(data)

        localStorage.setItem('user', JSON.stringify(this._user))
        return this._user
      })
      .catch(error => {
        this._error = error.error
        
        
        return this.handleError(error)
      })
    
  }

  logout() {
    localStorage.removeItem('user');
    
    this._user = {
      sub: '',
      name: ''
    }
    // logout the current user by removing the corresponding token.
  }

  getResource(resource): Observable<any> {
    if(this._user.name){
      return this.http.get(`api/${resource}`)
        .map(data => data)
        .catch(error => Observable.throw(this.handleError(error)))
    }



    // invoke a protected API route by including the Authorization header and return an Observable. 
    //
    // If e.g. invoking /api/friends, the 'resource' parameter should equal 'friends'.


  }
}
