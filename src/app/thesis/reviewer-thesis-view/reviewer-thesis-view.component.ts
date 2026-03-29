import { Component, inject, OnInit } from '@angular/core';
import { Thesis } from '../thesis';
import { Input } from '@angular/core';
import { ReviewerGrade } from '../../grading/grade';
import { GradingService } from '../../grading/grading.service';
import { GradingComponent } from '../../grading/grading.component';
import { HasAuthorityDirective } from '../../auth/has-authority.directive';
import { signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { CommitteeMemberGrade } from '../committee-member-thesis-view/committee.member.grade';
import { SupervisorFormService } from '../supervisor-thesis-view/supervisor-form-service';
import { SupervisorForm } from '../supervisor-thesis-view/supervisor-form';

@Component({
  selector: 'app-reviewer-thesis-view',
  imports: [GradingComponent, HasAuthorityDirective, MatButtonModule, MatCardModule, MatListModule, MatDividerModule, MatIconModule, ReactiveFormsModule, MatProgressBarModule, MatTableModule, CommonModule, MatTabsModule],
  templateUrl: './reviewer-thesis-view.component.html',
  styleUrl: './reviewer-thesis-view.component.css'
})
export class ReviewerThesisViewComponent implements OnInit{

  @Input() thesis!: Thesis;
  grade = signal<ReviewerGrade | null>(null);
  gradingService: GradingService = inject(GradingService);
  openGradingForm = false;
  committeeMemberGrades = signal<CommitteeMemberGrade[] | null>(null);
  private supervisorFormService = inject(SupervisorFormService);
  supervisorForm = signal<SupervisorForm | null>(null);
  displayedColumns: string[] = [ 'content', 'complexity', 'appearance',  ];

  get scores() {
     const g = this.grade(); 
     if (!g) return []; 
     return [ { content: g.contentScore, complexity: g.complexityScore, appearance: g.appearanceScore } ]; 
    }

  ngOnInit(): void {
    this.gradingService.getReviewerGrade(this.thesis.id).subscribe({
      next: (res) => {
        this.grade.set(res);
      }
    })

    this.gradingService.getAllCommitteeMemberGrades(this.thesis.id).subscribe({
      next: (res) => this.committeeMemberGrades.set(res)
    })

    this.supervisorFormService.getSupervisorForm(this.thesis.id).subscribe({
      next: (res) => this.supervisorForm.set(res)
    })
  }

  toggleGradingForm(): void {
    this.openGradingForm = !this.openGradingForm;
  }

  handleGradeSubmit(grade: ReviewerGrade) {
    this.grade.set(grade);
  }

  getFinalGrade(grade: CommitteeMemberGrade): string {
    const points = (grade.appearanceScore + grade.complexityScore + grade.contentScore + grade.presentationScore) * 5;
    if (points > 90) {
      return 'A';
    }
    if (points > 80) {
      return 'B';
    }
    if (points > 70) {
      return 'C';
    }
    if (points > 60) {
      return 'D';
    }
    if (points > 50) {
      return 'E';
    }
    return 'F';
  }
}
