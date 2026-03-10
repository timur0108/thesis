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

@Component({
  selector: 'app-committee-member-thesis-view',
  imports: [MatTableModule, CommonModule, MatCardModule],
  templateUrl: './committee-member-thesis-view.component.html',
  styleUrl: './committee-member-thesis-view.component.css'
})
export class CommitteeMemberThesisViewComponent implements OnInit{
  @Input() thesis!: Thesis;
  reviewerGrade = signal<ReviewerGrade | null>(null);
  ownGrade = signal<CommitteeMemberGrade | null>(null);
  committeeMemberGrades!: CommitteeMemberGrade[];
  private gradingService: GradingService = inject(GradingService);

  displayedColumns: string[] = [
    'contentScore',
    'complexityScore',
    'appearanceScore',
    'presentationScore'
  ];

  get scores() {
    const g = this.reviewerGrade();
    if (!g) return [];

    return [
      {
        content: g.contentScore,
        complexity: g.complexityScore,
        appearance: g.appearanceScore
      }
    ];
  }

  ngOnInit(): void {
    this.gradingService.getReviewerGrade(this.thesis.id).subscribe({
      next: (res) => this.reviewerGrade.set(res)
    })
    this.gradingService.getCommitteeMemberOwnnGrade(this.thesis.id).subscribe({
      next: (res) => this.ownGrade.set(res)
    })
  }

   get gradesForTable(): CommitteeMemberGrade[] {
    const grades = [...this.committeeMemberGrades];
    if (this.ownGrade() !== null) {
      grades.push(this.ownGrade()!);
    }
    return grades;
  }

  isOwnGradeRow(row: CommitteeMemberGrade): boolean {
    return this.ownGrade() !== null && row === this.ownGrade();
  }
}
