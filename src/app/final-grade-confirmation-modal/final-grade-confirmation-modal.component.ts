import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-final-grade-confirmation-modal',
  imports: [MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './final-grade-confirmation-modal.component.html',
  styleUrl: './final-grade-confirmation-modal.component.css'
})
export class FinalGradeConfirmationModalComponent {
  constructor(private dialogRef: MatDialogRef<FinalGradeConfirmationModalComponent>) {}

  close(result: boolean) {
    this.dialogRef.close(result);
  }
}
