import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-committee-member-grade-dialog',
  imports: [MatSlideToggleModule, MatButtonModule, MatDialogModule, CommonModule, ReactiveFormsModule],
  templateUrl: './committee-member-grade-dialog.component.html',
  styleUrl: './committee-member-grade-dialog.component.css'
})
export class CommitteeMemberGradeDialogComponent {
  form: FormGroup;
  
  constructor(
    private dialogRef: MatDialogRef<CommitteeMemberGradeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    
    this.form = new FormGroup({
  contentScore: new FormControl(data?.contentScore ?? null, [
    Validators.required,
    Validators.min(1),
    Validators.max(5)
  ]),
  complexityScore: new FormControl(data?.complexityScore ?? null, [
    Validators.required,
    Validators.min(1),
    Validators.max(5)
  ]),
  appearanceScore: new FormControl(data?.appearanceScore ?? null, [
    Validators.required,
    Validators.min(1),
    Validators.max(5)
  ]),
  presentationScore: new FormControl(data?.presentationScore ?? null, [
    Validators.required,
    Validators.min(1),
    Validators.max(5)
  ]),
});
  }

  setScore(field: string, value: number) {
    this.form.patchValue({ [field]: value });
  }

  submit() {
    this.dialogRef.close(this.form.value);
  }

  cancel() {
    this.dialogRef.close(null);
  }
}
