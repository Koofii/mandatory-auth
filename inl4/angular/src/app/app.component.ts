import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user = {}
  invalid;
  
  constructor(private authService: AuthService) {}

  ngOnInit(){
    this.user = this.authService.user
    if (this.user === null){
      this.user ={name: ''}
    }
  }

  login(username, password) {
    const cred = {username, password};
    this.authService.login(cred)
      .subscribe(data => {
        console.log(data, "from login")
        this.user = data
        this.invalid = false;
      },
      err => {
        this.invalid = err;
      }
    )}

  logout() {
    this.authService.logout()
    this.user = {}
  }

  testApi() {
    this.authService.getResource('friends')
      .subscribe(data => console.log(data))
  }
}
