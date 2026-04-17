import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private snackBar = inject(MatSnackBar);

  show(message: string, action: string = 'Close', duration: number = 3000) {
    this.snackBar.open(message, action, {
      duration,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  showSuccess(message: string) {
    this.snackBar.open(message, 'OK', {
        duration: 3000,
        panelClass: ['snackbar-success']
    });
    }

showError(message: string) {
    this.snackBar.open(message, 'Close', {
        duration: 4000,
        panelClass: ['snackbar-error']
    });
    }
}