import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from './../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    AppMaterialModule,
    SharedModule
  ],
  exports: [
    UserComponent,
  ]
})
export class UserModule { }
