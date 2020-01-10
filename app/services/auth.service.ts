import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
export interface Credentials {
  email: string;
  password: string;
}
 
export class MyUser {
  _id: string;
  email: string;
  isAdmin: boolean;  
}

interface UserResponse {
  _id: string;
  email: string;
  roles: [string];
}

interface LoginResponse {
  user: UserResponse,
  token: string  
}


@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) {    
  }

  get user(): MyUser | null {
    return JSON.parse(localStorage.getItem('user'));
  }
 
  login({email, password}: Credentials) {
    return this.http.post<LoginResponse>("http://localhost:3000/users/login",{
      "email": email,
      "password": password
    }).toPromise().then(
      result => 
      { 
        var tmpUser = new MyUser();
        tmpUser.email = result.user.email;
        tmpUser.isAdmin = true;
        tmpUser._id = result.user._id;
        localStorage.setItem('user', JSON.stringify(tmpUser));
        localStorage.setItem('id_token', result.token);
      }
    )
  }

  register({email, password}: Credentials) {
    return this.http.post("http://localhost:3000/users/register",{
      "email": email,
      "password": password,
      "roles": []
    }).toPromise();
  }
 
  logout() {
    var userId = JSON.parse(localStorage.getItem('user'))._id;
    var token = localStorage.getItem("id_token");
    localStorage.setItem('user', null);
    localStorage.removeItem('id_token');
    return this.http.post("http://localhost:3000/users/me/logout",{
      "token": token,
      "userId": userId
    }, { headers: {"Authorization":`Bearer ${token}`}}).toPromise();
  }
}