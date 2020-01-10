import { Component } from '@angular/core';
import {Credentials, AuthService} from '../services/auth.service'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  user : Credentials = { email: "", password: "" };
  authService : AuthService;
  message: string ="";

  constructor(service : AuthService) {
    this.authService = service;
   }

  onSubmit(){
    this.authService.register(this.user)
      .then(result => 
        {
          this.message = "Rejestracja przebiegła poprawnie"
        })
      .catch(error => 
        {
          this.message = "Błąd rejestracji"
        });
  }

}
