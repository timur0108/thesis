import { Component, inject, OnInit, signal } from '@angular/core';
import { Input } from '@angular/core';
import { Thesis } from '../thesis';
import { SupervisorForm } from '../supervisor-thesis-view/supervisor-form';
import { ReviewerGrade } from '../../grading/grade';
import { CommitteeMemberGrade } from '../committee-member-thesis-view/committee.member.grade';
import { GradingService } from '../../grading/grading.service';
import { SupervisorFormService } from '../supervisor-thesis-view/supervisor-form-service';
import { MatTabsModule } from '@angular/material/tabs';
import { ThesisOverviewComponent } from '../../thesis-overview/thesis-overview.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-co-supervisor-thesis-view',
  imports: [MatCardModule, CommonModule, MatIconModule, MatTabsModule, ThesisOverviewComponent],
  templateUrl: './co-supervisor-thesis-view.component.html',
  styleUrl: './co-supervisor-thesis-view.component.css'
})
export class CoSupervisorThesisViewComponent implements OnInit{
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
