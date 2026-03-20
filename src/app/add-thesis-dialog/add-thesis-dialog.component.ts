import { Component, inject } from '@angular/core';
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

  constructor(private dialogRef: MatDialogRef<AddThesisDialogComponent>) {}

  form = this.fb.group({
  studentName: [''],
  levelOfStudies: [''],
  curriculum: [''],
  languageOfThesis: [''],     
  volumeEcts: [''],          
  titleEstonian: [''],        
  titleEnglish: [''],         
  contextOfResearch: [''],
  studentContribution: [''],
  strengthOfThesis: [''],     
  limitationOfThesis: [''],   
  cooperation: [''],
  additionalComments: [''],
  supervisorName: [''],
  supervisorConsent: [''],
  supervisorDate: [''],
});



  submit() {
  const dto = this.form.getRawValue() as ThesisCreateDTO;

  this.thesisService.createThesis(dto).subscribe(() => {
    this.dialogRef.close(true);
  });
}

}
