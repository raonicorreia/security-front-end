import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './service/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'security';

  constructor(
      public loginService: LoginService,
      private router: Router) {
    if (loginService.isAutenticated()) {
      this.router.navigate(['user']);
    }
  }
}
