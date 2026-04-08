import { Component, Inject, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ThesisService } from '../thesis/thesis.service';
import { ThesisCreateDTO } from './thesis-create-dto';
import { Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupervisorFormService } from '../thesis/supervisor-thesis-view/supervisor-form-service';

@Component({
  selector: 'app-add-thesis-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './add-thesis-dialog.component.html',
  styleUrl: './add-thesis-dialog.component.css'
})
export class AddThesisDialogComponent {

  private fb = inject(FormBuilder);
  private thesisService: ThesisService = inject(ThesisService);
  private supervisorFormService: SupervisorFormService = inject(SupervisorFormService);

  constructor(
  private dialogRef: MatDialogRef<AddThesisDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: { thesisId: number }
) {}


  form = this.fb.group({
  contextOfResearch: [''],
  studentContribution: [''],
  strengthOfThesis: [''],     
  limitationOfThesis: [''],   
  cooperation: [''],
  additionalComments: [''],
});



  submit() {
  const dto = this.form.getRawValue() as ThesisCreateDTO;

  this.supervisorFormService.submitForm(dto, this.data.thesisId).subscribe(() => {
    this.dialogRef.close(true);
  });
}

}
