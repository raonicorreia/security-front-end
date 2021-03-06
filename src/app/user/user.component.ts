import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserControllerService, UserDTO } from 'lib/sec-api';
import { catchError, Observable, of, tap } from 'rxjs';
import { CommonService } from '../service/common/common.service';
import { ErrorDialogComponent } from '../shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  frmUser: FormGroup;
  userList: Observable<UserDTO[]> = new Observable<UserDTO[]>();
  user: UserDTO = {};
  displayedColumns: String[] = ['position','name', 'email', 'actions'];

  isInclusao:boolean = false;
  isEdit:boolean = false;

  constructor(
      private userControllerService: UserControllerService,
      private formBuilder: FormBuilder,
      public common: CommonService,
      ) {
    this.getAllUsers();
    this.frmUser = this.createNewForm();
  }

  getAllUsers(): void {
    this.userList = this.userControllerService
      .getUsersUsingGET({name: '%'}).pipe(
        catchError(error => {
          this.common.onError(error);
          return of([]);
        })
      );
  }

  createNewForm(): FormGroup {
    this.user = {};
    return this.formBuilder.group({
      id: [this.user.id],
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      username: [this.user.username, [Validators.required]],
      password: [this.user.password, [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  openInsert(): void {
    this.isInclusao = true;
  }

  openEdit(param:UserDTO): void {
    this.frmUser.reset(param);
    this.isInclusao = true;
    this.isEdit = true;
  }

  delete(param:number): void {
    this.userControllerService.removeUsingDELETE1(param).pipe(
      tap((data) => {
        console.log(data);
      }),
      catchError(error => {
        this.common.onError(error);
        return of([]);
      })
    )
    .subscribe();
  }

  closeInsert(): void {
    this.isInclusao = !this.isInclusao;
    this.isEdit = !this.isEdit;
    this.frmUser.reset();
  }

  save(): void {
    if (this.frmUser.valid) {
      if (this.isEdit) {
        this.userControllerService
        .updateUsingPUT1(this.frmUser.value)
        .pipe(
          tap((data) => {
            console.log(data);
            this.getAllUsers();
            this.closeInsert();
          }),
          catchError(error => {
            this.common.onError(error);
            return of([]);
          })
        )
        .subscribe();
      } else {
        this.userControllerService
        .createUsingPOST1(this.frmUser.value)
        .pipe(
          tap((data) => {
            console.log(data);
            this.getAllUsers();
            this.closeInsert();
          }),
          catchError(error => {
            this.common.onError(error);
            return of([]);
          })
        )
        .subscribe();
      }
    }
  }

}
