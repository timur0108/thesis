import { Component } from '@angular/core';
import { Thesis } from '../thesis';
import { Input } from '@angular/core';
import { inject } from '@angular/core';
import { GradingService } from '../../grading/grading.service';
import { SupervisorFormService } from '../supervisor-thesis-view/supervisor-form-service';
import { SupervisorForm } from '../supervisor-thesis-view/supervisor-form';
import { signal } from '@angular/core';
import { ReviewerGrade } from '../../grading/grade';
import { CommitteeMemberGrade } from '../committee-member-thesis-view/committee.member.grade';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { ThesisOverviewComponent } from '../../thesis-overview/thesis-overview.component';

@Component({
  selector: 'app-admin-thesis-view',
  imports: [ThesisOverviewComponent, MatTabsModule, MatCardModule, MatIconModule, CommonModule],
  templateUrl: './admin-thesis-view.component.html',
  styleUrl: './admin-thesis-view.component.css'
})
export class AdminThesisViewComponent {
  @Input() thesis!: Thesis;
  gradingService = inject(GradingService);
  supervisorFormService = inject(SupervisorFormService);

  supervisorForm = signal<SupervisorForm | null>(null);
  reviewerGrade = signal<ReviewerGrade | null>(null);
  committeeMemberGrades = signal<CommitteeMemberGrade[] | null>(null);

  ngOnInit(): void {
    this.gradingService.getAllCommitteeMemberGrades(this.thesis.id).subscribe((res) => this.committeeMemberGrades.set(res));
    this.supervisorFormService.getSupervisorForm(this.thesis.id).subscribe((res) => this.supervisorForm.set(res));
    this.gradingService.getReviewerGrade(this.thesis.id).subscribe((res) => this.reviewerGrade.set(res));
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
