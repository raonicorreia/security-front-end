import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiModule } from 'lib/sec-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpInterceptorModule } from './http-interceptor/http-interceptor.module';
import { LoginModule } from './login/login.module';
import { LoginService } from './service/login/login.service';
import { AppMaterialModule } from './shared/app-material/app-material.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    UserModule,
    HttpClientModule,
    ApiModule,
    BrowserAnimationsModule,
    HttpInterceptorModule,
    AppMaterialModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
