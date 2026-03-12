import { Component, inject, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Thesis } from '../thesis';
import { signal } from '@angular/core';
import { CommitteeMemberGrade } from '../committee-member-thesis-view/committee.member.grade';
import { GradingService } from '../../grading/grading.service';
import { ReviewerGrade } from '../../grading/grade';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { Signal } from '@angular/core';
import { computed } from '@angular/core';

@Component({
  selector: 'app-head-of-committee-thesis-view',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './head-of-committee-thesis-view.component.html',
  styleUrl: './head-of-committee-thesis-view.component.css'
})
export class HeadOfCommitteeThesisViewComponent implements OnInit{
  @Input() thesis!: Thesis;

  gradingService: GradingService = inject(GradingService);
  committeeMemberGrades = signal<CommitteeMemberGrade[] | null>(null);
  reviewerGrade = signal<ReviewerGrade | null>(null);

  gradesVisible: Signal<boolean> = computed(() =>
    this.committeeMemberGrades()?.every(g => g.visibleToOthers) ?? false
  );

  ngOnInit(): void {
    this.gradingService.getReviewerGrade(this.thesis.id).subscribe({
      next: (res) => this.reviewerGrade.set(res)
    })

    this.gradingService.getAllCommitteeMemberGrades(this.thesis.id).subscribe({
      next: (res) => this.committeeMemberGrades.set(res)
    })
  }

  makeVisible() {
    if (!this.committeeMemberGrades()) {
      return;
    }

    this.gradingService.makeGradesVisible(this.thesis.id).subscribe({
      next: (res) => this.committeeMemberGrades.set(res)
    })
  }

  hideGrades() {
    this.gradingService.hideGrades(this.thesis.id).subscribe({
      next: (res) => this.committeeMemberGrades.set(res)
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
