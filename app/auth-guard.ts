import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.authService.user == null){ 
        this.router.navigate(['/login']);
        return false;
    }
    
    if (next.data.isAdmin && !this.authService.user.isAdmin)
    {
        this.router.navigate(['/courses']);
        return false;
    }
    return true;
    }


}