import { Component, inject, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import {TooltipPosition, MatTooltipModule} from '@angular/material/tooltip';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { ThesisOverviewComponent } from '../thesis-overview/thesis-overview.component';
import { signal } from '@angular/core';
import { Thesis } from '../thesis/thesis';
import { ReviewerGrade } from '../grading/grade';
import { CommitteeMemberGrade } from '../thesis/committee-member-thesis-view/committee.member.grade';
import { GradingService } from '../grading/grading.service';
import { SupervisorFormService } from '../thesis/supervisor-thesis-view/supervisor-form-service';
import { SupervisorForm } from '../thesis/supervisor-thesis-view/supervisor-form';
import { MatDialog } from '@angular/material/dialog';
import { AddThesisDialogComponent } from '../add-thesis-dialog/add-thesis-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { CommitteeMemberGradeDialogComponent } from '../committee-member-grade-dialog/committee-member-grade-dialog.component';

@Component({
  selector: 'app-supervisor-committee-thesis-view',
  imports: [CommitteeMemberGradeDialogComponent, MatIconModule, AddThesisDialogComponent, ThesisOverviewComponent, MatTableModule, CommonModule, MatCardModule, MatButtonModule, FormsModule, MatTooltipModule, CommonModule, MatTabsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule],
  templateUrl: './supervisor-committee-thesis-view.component.html',
  styleUrl: './supervisor-committee-thesis-view.component.css'
})
export class SupervisorCommitteeThesisViewComponent {
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
  private dialog = inject(MatDialog);
  supervisorForm = signal<SupervisorForm | null>(null);

  openSUpervisorFormModal() {
      this.onAddThesis();
    }
  
    onAddThesis() {
      const dialogRef = this.dialog.open(AddThesisDialogComponent, {
        width: '50vw',
        height: '80vh',
        maxWidth: '100vw',
        disableClose: false,
        data: { thesisId: this.thesis.id }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
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
      });
    }
  

  getDataForReviewer() {
    const arr = []
    arr.push(this.reviewerGrade());
    return arr;
  }

  startReview() {
  const dialogRef = this.dialog.open(CommitteeMemberGradeDialogComponent, {
    width: '600px',
    data: {
      isEdit: false
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (!result) return;

    const grade = new CommitteeMemberGrade(
      0,
      this.thesis.id,
      result.contentScore,
      result.complexityScore,
      result.appearanceScore,
      result.presentationScore,
      "asd",
      "asd",
      false
    );

    this.gradingService.submitCommitteeMemberGrade(grade).subscribe({
      next: (res) => {
        this.ownGrade.set(res);
      }
    });
  });
}

  submitReview() {
    const formValue = this.gradeForm.getRawValue();
    const grade = new CommitteeMemberGrade(0,
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
  const current = this.ownGrade();
  if (!current) return;

  const dialogRef = this.dialog.open(CommitteeMemberGradeDialogComponent, {
    width: '600px',
    data: {
      ...current,
      isEdit: true
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (!result) return;

    const updated = new CommitteeMemberGrade(
      current.id,
      this.thesis.id,
      result.contentScore,
      result.complexityScore,
      result.appearanceScore,
      result.presentationScore,
      current.name,
      current.secondName,
      current.visibleToOthers
    );

    this.gradingService.changeGrade(updated).subscribe({
      next: (res) => {
        this.ownGrade.set(res);
      }
    });
  });
}

canSubmitFinalGrade(): boolean {
    const members = this.committeeMemberGrades();
    const own = this.ownGrade();

    if (!members || members.length === 0 || !own) {
      return false;
    }

    const allGrades = [...members, own];

    const reference = allGrades[0];

    return allGrades.every(g =>
      g.contentScore === reference.contentScore &&
      g.complexityScore === reference.complexityScore &&
      g.appearanceScore === reference.appearanceScore &&
      g.presentationScore === reference.presentationScore
    );
  }

  cancelChangeGrade() {
    this.isGrading = false;
  }

  private getAllGrades(): CommitteeMemberGrade[] {
    const members = this.committeeMemberGrades() ?? [];
    const own = this.ownGrade();
    return own ? [...members, own] : members;
  } 

  isConflictInCategory(category: keyof CommitteeMemberGrade): boolean {
    const grades = this.getAllGrades();

    if (grades.length === 0) return false;

    const firstValue = grades[0][category];

    return grades.some(g => g[category] !== firstValue);
  }

  submitChangedGrade() {
    const formValue = this.gradeForm.getRawValue();
    const grade = new CommitteeMemberGrade(this.ownGrade()!.id,
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
