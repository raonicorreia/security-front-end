import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public saveToken(token:string):void {
    localStorage.setItem('token', token);
  }

  public logout():void {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  public isAutenticated():boolean {
    let isAuth = localStorage.getItem('token');
    if (isAuth) {
      return true;
    } else {
      return false;
    }
  }

  public getToken(): String | null {
    if (!this.isAutenticated()) {
      this.router.navigate(['']);
    }
    return localStorage.getItem('token');
  }

  constructor(
    private router: Router) { }

}
