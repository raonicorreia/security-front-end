import { TokenResponse } from './../../../lib/sec-api/model/tokenResponse';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginControllerService, UserCredentials } from 'lib/sec-api';
import { catchError, of, tap } from 'rxjs';
import { LoginService } from '../service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  frmGroupLogin: FormGroup;
  user: UserCredentials = {username:'admin', password:'FUxqDqZdVVbt/SR+F0y8tQ=='};
  //user: UserCredentials = {};
  token: string = '';
  messageErro: string = '';

  constructor(
    private loginController: LoginControllerService,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.frmGroupLogin = this.formBuilder.group({
      username: [this.user.username, [Validators.required]],
      password: [this.user.password, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.frmGroupLogin.valid) {
      this.loginController
        .loginUsingPOST(this.frmGroupLogin.value)
        .pipe(
          catchError((error) => {
            console.log(error);
            if (error.error.message) {
              this.messageErro = error.error.message;
            } else {
              this.messageErro = error.message;
            }
            return of({});
          })
        )
        .subscribe((data:TokenResponse) => {
          if (data && data.access_token) {
            // console.log(data);
            this.router.navigate(['user']);
            this.loginService.saveToken(data.access_token);
          } else {
            console.log(data);
          }
        });
      this.token = '';
      this.messageErro = '';
    }
  }
}
