import { Component, inject, Input, OnInit, output } from '@angular/core';
import { ReviewerGrade } from './grade';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormGroup, FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ContentGradeDescriptionDialogComponent } from './content-grade-description-dialog/content-grade-description-dialog.component';
import { MatStepperModule } from '@angular/material/stepper';
import { Thesis } from '../thesis/thesis';
import { GradingService } from './grading.service';
import { HasAuthorityDirective } from '../auth/has-authority.directive';

@Component({
  selector: 'app-grading',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatIconModule, ReactiveFormsModule, MatDialogModule, MatStepperModule, HasAuthorityDirective],
  templateUrl: './grading.component.html',
  styleUrl: './grading.component.css'
})
export class GradingComponent implements OnInit{
  
  @Input() thesis!: Thesis;
  
  readonly dialog = inject(MatDialog);
  private gradingService: GradingService = inject(GradingService);
  gradeSubmitted = output<ReviewerGrade>();
  grade!: ReviewerGrade | null;

  gradeForm = new FormGroup({
    contentScore: new FormControl<number>(0, { nonNullable: true }),
    contentReasoning: new FormControl<string>('', { nonNullable: true }),
    complexityScore: new FormControl<number>(0, { nonNullable: true }),
    complexityReasoning: new FormControl<string>('', { nonNullable: true }),
    appearanceScore: new FormControl<number>(0, { nonNullable: true }),
    appearanceReasoning: new FormControl<string>('', { nonNullable: true }),
    evaluationSummary: new FormControl<string>('', { nonNullable: true }),
    questions: new FormControl<string>('', { nonNullable: true })
  });

  ngOnInit(): void {
    this.gradingService.getReviewerGrade(this.thesis.id).subscribe({
      next: (data) => {
        this.grade = data;
      }
    })
  }
  
  showGradingGuide(): void {
    const dialogRef = this.dialog.open(ContentGradeDescriptionDialogComponent);
  }

  submitGrades() {
    if (this.gradeForm.valid) {
      const formValue = this.gradeForm.getRawValue();

      const grade = new ReviewerGrade(
        this.thesis.id,
        formValue.contentScore,
        formValue.contentReasoning,
        formValue.complexityScore,
        formValue.complexityReasoning,
        formValue.appearanceScore,
        formValue.appearanceReasoning,
        formValue.questions,
        formValue.evaluationSummary,
        "",
        ""
      );

    this.gradingService.submitReviewerGrade(grade).subscribe({
      next: (data) => {
        this.gradeSubmitted.emit(data);
      }
    });
      
    } else {
      console.warn('Form is invalid');
    }
  }
}
