import { Component, inject, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Thesis } from '../thesis';
import { signal } from '@angular/core';
import { ReviewerGrade } from '../../grading/grade';
import { GradingService } from '../../grading/grading.service';
import { CommitteeMemberGrade } from './committee.member.grade';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import {TooltipPosition, MatTooltipModule} from '@angular/material/tooltip';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { SupervisorForm } from '../supervisor-thesis-view/supervisor-form';
import { SupervisorFormService } from '../supervisor-thesis-view/supervisor-form-service';

@Component({
  selector: 'app-committee-member-thesis-view',
  imports: [MatTableModule, CommonModule, MatCardModule, MatButtonModule, FormsModule, MatTooltipModule, CommonModule, MatTabsModule,
  ReactiveFormsModule,
  MatCardModule,
  MatButtonModule],
  templateUrl: './committee-member-thesis-view.component.html',
  styleUrl: './committee-member-thesis-view.component.css'
})
export class CommitteeMemberThesisViewComponent implements OnInit{
  @Input() thesis!: Thesis;
  reviewerGrade = signal<ReviewerGrade | null>(null);
  ownGrade = signal<CommitteeMemberGrade | null>(null);
  committeeMemberGrades = signal<CommitteeMemberGrade[] | null>(null);
  private gradingService: GradingService = inject(GradingService);
  private supervisorFormService: SupervisorFormService = inject(SupervisorFormService);
  gradeForm!: FormGroup;
  
  displayedColumns: string[] = ['role', 'content', 'complexity', 'appearance', 'presentation']
  isGrading = false;
  dataForReviewer!: (ReviewerGrade | CommitteeMemberGrade)[];

  supervisorForm = signal<SupervisorForm | null>(null);

  getDataForReviewer() {
    const arr = []
    arr.push(this.reviewerGrade());
    return arr;
  }

  startReview() {
    this.isGrading = true;
  }

  submitReview() {
    const formValue = this.gradeForm.getRawValue();
    const grade = new CommitteeMemberGrade(
      this.thesis.id, formValue.contentScore, formValue.complexityScore, formValue.appearanceScore, formValue.presentationScore, "asd", "asd"
    , false);
    this.gradingService.submitCommitteeMemberGrade(grade).subscribe({
      next: (res) => {
        this.ownGrade.set(res);
        this.isGrading = false;
      }
    })
  }

  cancelReview() {
    this.isGrading = false;
    this.ownGrade.set(null);
  }

  ngOnInit(): void {
    this.gradingService.getReviewerGrade(this.thesis.id).subscribe({
      next: (res) => 
        this.reviewerGrade.set(res)   
      })
    this.gradingService.getCommitteeMemberOwnnGrade(this.thesis.id).subscribe({
      next: (res) => {
        this.ownGrade.set(res);
        this.gradeForm = new FormGroup({
        contentScore: new FormControl(res?.contentScore ?? null),
        complexityScore: new FormControl(res?.complexityScore ?? null),
        appearanceScore: new FormControl(res?.appearanceScore ?? null),
        presentationScore: new FormControl(res?.presentationScore ?? '')
      });
      }
      })
    this.gradingService.getCommitteeMemberGradesOfOtherMembers(this.thesis.id).subscribe({
      next: (res) => this.committeeMemberGrades.set(res)
    })

    this.supervisorFormService.getSupervisorForm(this.thesis.id).subscribe({
      next: (res) => this.supervisorForm.set(res)
    })
  }

  get gradesForTable(): CommitteeMemberGrade[] {
    const others = this.committeeMemberGrades() ?? [];
    const own = this.ownGrade();

    return own ? [...others, own] : others;
  }

  cahngeGrade() {
    this.isGrading = true;
  }

  cancelChangeGrade() {
    this.isGrading = false;
  }

  submitChangedGrade() {
    const formValue = this.gradeForm.getRawValue();
    const grade = new CommitteeMemberGrade(
      this.thesis.id, formValue.contentScore, formValue.complexityScore, formValue.appearanceScore, formValue.presentationScore, "asd", "asd"
    , false);
    this.gradingService.changeGrade(grade).subscribe({
      next: (res) => {
        this.ownGrade.set(res);
        this.isGrading = false;
      }
    })
  }

  isOwnGradeRow(row: CommitteeMemberGrade): boolean {
    return this.ownGrade() !== null && row === this.ownGrade();
  }

  getReviewerScore(category: 'content' | 'complexity' | 'appearance') {
    if (!this.reviewerGrade()) return null;
    switch (category) {
      case 'content': return { score: this.reviewerGrade()!.contentScore, reasoning: this.reviewerGrade()!.contentReasoning };
      case 'complexity': return { score: this.reviewerGrade()!.complexityScore, reasoning: this.reviewerGrade()!.complexityReasoning };
      case 'appearance': return { score: this.reviewerGrade()!.appearanceScore, reasoning: this.reviewerGrade()!.appearanceReasoning };
      default: return null;
    }
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
