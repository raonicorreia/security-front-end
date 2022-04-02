import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public dialog: MatDialog) { }

  public onError(errorMsg: any) {
    let message;
    if (errorMsg.error.message) {
      message = errorMsg.error.message;
    } else {
      message = errorMsg.message;
    }
    this.dialog.open(ErrorDialogComponent, {
      data: message
    });
  }
}
