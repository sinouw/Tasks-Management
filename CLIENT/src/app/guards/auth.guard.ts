import { AccountService } from '../services/account.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private router: Router, private service: AccountService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.service.tokenExists() == false) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    } else {
      let currentRoles =this.service.getDecodedToken().roles;
      if (next.data.roles && next.data.roles.indexOf(currentRoles) === -1) {
        this.router.navigateByUrl('/dashboard');
        return false;
    }
      return true;

    }
  }

}