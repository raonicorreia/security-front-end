import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionRoutingModule } from './permission-routing.module';
import { PermissionComponent } from './permission.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PermissionComponent
  ],
  imports: [
    CommonModule,
    PermissionRoutingModule,
    AppMaterialModule,
    SharedModule
  ],
  exports: [
    PermissionComponent
  ]
})
export class PermissionModule { }
