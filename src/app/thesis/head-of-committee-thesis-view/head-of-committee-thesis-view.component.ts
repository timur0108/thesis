import { Component, inject, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Thesis } from '../thesis';
import { signal } from '@angular/core';
import { CommitteeMemberGrade } from '../committee-member-thesis-view/committee.member.grade';
import { GradingService } from '../../grading/grading.service';
import { FinalGrade, ReviewerGrade } from '../../grading/grade';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { Signal } from '@angular/core';
import { computed } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import {TooltipPosition, MatTooltipModule} from '@angular/material/tooltip';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import { SupervisorFormService } from '../supervisor-thesis-view/supervisor-form-service';
import { SupervisorForm } from '../supervisor-thesis-view/supervisor-form';
import { ThesisOverviewComponent } from '../../thesis-overview/thesis-overview.component';
import { MatIconModule } from '@angular/material/icon';
import { MatLabel } from '@angular/material/input';
import { MatFormField } from '@angular/material/input';
import { User } from '../../user/user';
import { UserService } from '../../user/user.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FinalGradeConfirmationModalComponent } from '../../final-grade-confirmation-modal/final-grade-confirmation-modal.component';
import { CommitteeMemberGradeDialogComponent } from '../../committee-member-grade-dialog/committee-member-grade-dialog.component';

@Component({
  selector: 'app-head-of-committee-thesis-view',
  imports: [MatFormField,MatLabel, MatDialogModule, MatIconModule, ThesisOverviewComponent, MatTabsModule, MatCardModule, MatButtonModule, MatTableModule, CommonModule, MatButtonModule, FormsModule, MatTooltipModule, CommonModule, MatSlideToggleModule,
  ReactiveFormsModule],
  templateUrl: './head-of-committee-thesis-view.component.html',
  styleUrl: './head-of-committee-thesis-view.component.css'
})
export class HeadOfCommitteeThesisViewComponent implements OnInit{
  @Input() thesis!: Thesis;
  userService: UserService = inject(UserService);
  gradingService: GradingService = inject(GradingService);
  committeeMemberGrades = signal<CommitteeMemberGrade[] | null>(null);
  reviewerGrade = signal<ReviewerGrade | null>(null);
  ownGrade = signal<CommitteeMemberGrade | null>(null);
  gradeForm!: FormGroup;
  isGrading = false;
  private supervisorFormService = inject(SupervisorFormService);
  supervisorForm = signal<SupervisorForm | null>(null);
  finalGrade = signal<FinalGrade | null>(null);
  editingGrade = signal<CommitteeMemberGrade | null>(null);
  gradesVisible= signal<boolean | null>(null);
  unsubmittedCommitteeMembers = signal<User[] | null>(null);
  dialog: MatDialog = inject(MatDialog);

  onToggle(isChecked: boolean) {
    if (isChecked) {
      this.makeVisible();
    } else {
      this.hideGrades();
    }
  }

  ngOnInit(): void {
    this.gradingService.getReviewerGrade(this.thesis.id).subscribe({
      next: (res) => this.reviewerGrade.set(res)
    })

    this.getUnsubmittedCommitteeMembes();

    this.gradingService.getCommitteeMemberGradesOfOtherMembers(this.thesis.id).subscribe({
      next: (res) => this.committeeMemberGrades.set(res)
    })

    this.gradingService.getAreGradesVisible(this.thesis.id).subscribe({
      next: (res) => this.gradesVisible.set(res)
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

    this.supervisorFormService.getSupervisorForm(this.thesis.id).subscribe({
      next: (res) => this.supervisorForm.set(res)
    })

    this.gradingService.getFinalGrade(this.thesis.id).subscribe({
      next: (res) => this.finalGrade.set(res)
    })
  }

  getUnsubmittedCommitteeMembes() {
    this.userService.getUnsubmittedCommitteeMembers(this.thesis.id).subscribe({
      next: (res) => this.unsubmittedCommitteeMembers.set(res)
    })
  }
  
  startGradeChange() {
    this.isGrading = true;
  }

  cancelGradeChange() {
    this.isGrading = false;
  }

  submitGradeChange() {
  const formValue = this.gradeForm.getRawValue();
  const editing = this.editingGrade();

  if (!editing) return;

  const updated = new CommitteeMemberGrade(
    editing.id,
    this.thesis.id,
    formValue.contentScore,
    formValue.complexityScore,
    formValue.appearanceScore,
    formValue.presentationScore,
    editing.name,
    editing.secondName,
    editing.visibleToOthers
  );

  this.gradingService.changeGrade(updated).subscribe({
    next: (res) => {
      
      if (this.ownGrade()?.name === editing.name) {
        this.ownGrade.set(res);
      } else {
        this.committeeMemberGrades.update(list =>
          list?.map(g => g.name === editing.name ? res : g) ?? null
        );
      }

      this.isGrading = false;
      this.editingGrade.set(null);
    }
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

  cancelReview() {
    this.isGrading = false;
    this.ownGrade.set(null);
  }

  makeVisible() {
    if (!this.committeeMemberGrades()) {
      return;
    }

    this.gradingService.makeGradesVisible(this.thesis.id).subscribe({
      next: (res) => {
        this.committeeMemberGrades.set(res);
        this.gradesVisible.set(true);
      }
    })
  }

  hideGrades() {
    this.gradingService.hideGrades(this.thesis.id).subscribe({
      next: (res) => {
        this.committeeMemberGrades.set(res);
        this.gradesVisible.set(false);
      }
    })
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

  submitFinalGrade() {
    const dialogRef = this.dialog.open(FinalGradeConfirmationModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return; // user cancelled

      this.confirmSubmitFinalGrade();
    });
  }

  confirmSubmitFinalGrade() {
    const members = this.committeeMemberGrades();
    const own = this.ownGrade();

    if (!members || members.length === 0 || !own) {
      console.error('Cannot submit final grade: missing grades.');
      return;
    }

    const allGrades = [...members, own];

    if (!this.canSubmitFinalGrade()) {
      console.error('Cannot submit final grade: grades conflict.');
      return;
    }

    const reference = allGrades[0];
    const totalPoints =
      reference.contentScore +
      reference.complexityScore +
      reference.appearanceScore +
      reference.presentationScore;

    const letterGrade = this.getFinalGrade(reference);

    const finalGrade = {
      thesisId: this.thesis.id,
      contentScore: reference.contentScore,
      complexityScore: reference.complexityScore,
      appearanceScore: reference.appearanceScore,
      presentationScore: reference.presentationScore,
      totalScore: totalPoints,
      letterGrade: letterGrade
    };

    this.gradingService.submitFinalGrade(finalGrade).subscribe({
      next: (res) => {
        this.finalGrade.set(res);
        this.isGrading = false;
        window.location.reload();
      },
      error: (err) => {
        console.error('Error submitting final grade:', err);
      }
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

  getScoreClass(score: number): string {
    if (score <= 2) return 'low';
    if (score < 5) return 'medium';
    return 'high';
  }

  startEdit(grade: CommitteeMemberGrade) {
  if (this.finalGrade()) return;

  const dialogRef = this.dialog.open(CommitteeMemberGradeDialogComponent, {
    width: '600px',
    data: {
      ...grade,
      isEdit: true
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (!result) return;

    const updated = new CommitteeMemberGrade(
      grade.id,
      this.thesis.id,
      result.contentScore,
      result.complexityScore,
      result.appearanceScore,
      result.presentationScore,
      grade.name,
      grade.secondName,
      grade.visibleToOthers
    );

    this.gradingService.changeGrade(updated).subscribe({
      next: (res) => {
       
        if (this.ownGrade()?.id === grade.id) {
          this.ownGrade.set(res);
        } else {
          this.committeeMemberGrades.update(list =>
            list?.map(g => g.id === grade.id ? res : g) ?? null
          );
        }
      }
    });
  });
}

  cancelEdit() {
    this.isGrading = false;
    this.editingGrade.set(null);
  }
}
