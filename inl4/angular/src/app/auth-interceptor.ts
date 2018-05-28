import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';

// ...
// Example of user credentials to match against incoming credentials.
const username  = 'Koof';
const password  = 'password';

// list of friends to return when the route /api/friends is invoked.
const friends   = ['alice', 'bob'] 

// the hardcoded JWT access token you created @ jwt.io.
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Iktvb2YifQ.BVC1058fTSjkF0NlpchGWMacYV-7p14HLleu7ndxDLk';

// ...
// Use these methods in the implementation of the intercept method below to return either a success or failure response.
const makeError = (status, error) => {
    return Observable.throw(
        new HttpErrorResponse({
            status,
            error
        })
    );
};

const makeResponse = body => {
    return of(
        new HttpResponse({
            status: 200,
            body
        })
    );
};

// ...

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
  intercept(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    const { 
        body,       // object
        headers,    // object   
        method,     // string
        url,        // string
    } = req;

    
    switch(url){
        case 'api/auth':
            if(body.username === username && body.password === password){
                console.log('creds are ok')
                return makeResponse(token)
            } else {
                return makeError(401, 'Invalid credentials')
            }
        case 'api/friends':
            console.log(body, "body")
            console.log(headers, "header")
            console.log(method, "method")
            console.log(url, "url")
            return makeResponse(friends);

        default: 
            console.log("error")
            break;
    }

    // implement logic for handling API requests, as defined in the exercise instructions.
  }
}