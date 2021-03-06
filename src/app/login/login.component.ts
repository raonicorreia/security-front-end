import { TokenResponse } from './../../../lib/sec-api/model/tokenResponse';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginControllerService, UserCredentials } from 'lib/sec-api';
import { catchError, of, tap } from 'rxjs';
import { LoginService } from '../service/login/login.service';
import { CommonService } from '../service/common/common.service';
import { AesEncryptionService } from '../service/common/aes-encryption.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  frmGroupLogin: FormGroup;
  user: UserCredentials = {username:'admin', password:'123456'};
  //user: UserCredentials = {};
  token: string = '';
  messageErro: string = '';

  constructor(
    private loginController: LoginControllerService,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
    public common: CommonService,
    public aesEncrypt: AesEncryptionService
  ) {
    this.frmGroupLogin = this.formBuilder.group({
      username: [this.user.username, [Validators.required]],
      password: [this.user.password, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.frmGroupLogin.valid) {
      let user = {
        username: this.frmGroupLogin.value.username,
        password: this.aesEncrypt.encrypt(this.frmGroupLogin.value.password),
      }
      this.loginController
        .loginUsingPOST(user)
        .pipe(
          catchError((error) => {
            this.common.onError(error);
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
