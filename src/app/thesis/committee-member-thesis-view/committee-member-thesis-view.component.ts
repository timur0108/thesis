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

@Component({
  selector: 'app-committee-member-thesis-view',
  imports: [MatTableModule, CommonModule, MatCardModule, MatButtonModule, MatDivider],
  templateUrl: './committee-member-thesis-view.component.html',
  styleUrl: './committee-member-thesis-view.component.css'
})
export class CommitteeMemberThesisViewComponent implements OnInit{
  @Input() thesis!: Thesis;
  reviewerGrade = signal<ReviewerGrade | null>(null);
  ownGrade = signal<CommitteeMemberGrade | null>(null);
  committeeMemberGrades = signal<CommitteeMemberGrade[] | null>(null);
  private gradingService: GradingService = inject(GradingService);

  ngOnInit(): void {
    this.gradingService.getReviewerGrade(this.thesis.id).subscribe({
      next: (res) => this.reviewerGrade.set(res)
    })
    this.gradingService.getCommitteeMemberOwnnGrade(this.thesis.id).subscribe({
      next: (res) => this.ownGrade.set(res)
    })
    this.gradingService.getCommitteeMemberGradesOfOtherMembers(this.thesis.id).subscribe({
      next: (res) => this.committeeMemberGrades.set(res)
    })
  }

   get gradesForTable(): CommitteeMemberGrade[] {
  const others = this.committeeMemberGrades() ?? [];
  const own = this.ownGrade();

  return own ? [...others, own] : others;
}


  isOwnGradeRow(row: CommitteeMemberGrade): boolean {
    return this.ownGrade() !== null && row === this.ownGrade();
  }
}
