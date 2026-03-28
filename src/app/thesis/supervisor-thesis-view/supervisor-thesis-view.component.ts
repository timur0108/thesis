import { Component, inject, OnInit, signal } from '@angular/core';
import { SupervisorForm } from './supervisor-form';
import { SupervisorFormService } from './supervisor-form-service';
import { Input } from '@angular/core';
import { Thesis } from '../thesis';
import {MatTabsModule} from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { CommitteeMemberGrade } from '../committee-member-thesis-view/committee.member.grade';
import { GradingService } from '../../grading/grading.service';
import { ReviewerGrade } from '../../grading/grade';

@Component({
  selector: 'app-supervisor-thesis-view',
  imports: [MatDivider, MatIconModule, CommonModule, MatSpinner, MatTabsModule, MatCardModule],
  templateUrl: './supervisor-thesis-view.component.html',
  styleUrl: './supervisor-thesis-view.component.css'
})
export class SupervisorThesisViewComponent implements OnInit {

  @Input() thesis!: Thesis;
  supervisorForm = signal<SupervisorForm | null>(null);
  supervisorFormService = inject(SupervisorFormService);
  gradingService = inject(GradingService);
  committeeMemberGrades = signal<CommitteeMemberGrade[] | null>(null);
  reviewerGrade = signal<ReviewerGrade | null>(null);

  ngOnInit(): void {
    this.supervisorFormService.getSupervisorForm(this.thesis.id).subscribe({
      next: (res) => {
        this.supervisorForm.set(res);
        console.log(this.supervisorForm())
      }
      })
      
    this.gradingService.getAllCommitteeMemberGrades(this.thesis.id).subscribe({
      next: (res) => this.committeeMemberGrades.set(res)
    })

    this.gradingService.getReviewerGrade(this.thesis.id).subscribe({
      next: (res) => this.reviewerGrade.set(res)
    })
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
