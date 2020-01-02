import { Component } from '@angular/core';
import {Credentials, AuthService} from '../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent  {
  user : Credentials = { email: "", password: "" };
  authService : AuthService;
  message: string;

  constructor(service : AuthService,private router : Router) {
    this.authService = service;
   }

  onSubmit(){
    this.authService.login(this.user)
      .then(result => 
        {
            this.router.navigateByUrl('/courses');
        })
      .catch(error => 
        {
          this.message = "Logowanie niepoprawne"
        });
  }

}
