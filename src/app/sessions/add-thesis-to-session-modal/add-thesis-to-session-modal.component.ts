import { Component, inject, OnInit, signal } from '@angular/core';
import { User } from '../../user/user';
import { UserService } from '../../user/user.service';
import { Student } from './student';
import { StudentService } from './student.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ThesisService } from '../../thesis/thesis.service';
import { NewThesisDTO } from '../../thesis/thesis';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-thesis-to-session-modal',
  imports: [CommonModule, MatButtonModule, MatInputModule, FormsModule, ReactiveFormsModule, MatSelectModule, MatDialogModule],
  templateUrl: './add-thesis-to-session-modal.component.html',
  styleUrl: './add-thesis-to-session-modal.component.css'
})
export class AddThesisToSessionModalComponent implements OnInit{
  userSerivce = inject(UserService);
  studentService = inject(StudentService);
  thesisService = inject(ThesisService);
  
  committeeMembers = signal<User[]>([]);
  headOfCommittee = signal<User | null>(null);

  dialogRef = inject(MatDialogRef<AddThesisToSessionModalComponent>);
  data = inject(MAT_DIALOG_DATA);

  form = new FormGroup({
  titleEnglish: new FormControl<string>('', Validators.required),
  titleEstonian: new FormControl<string>(''),
  curriculum: new FormControl<string>('', Validators.required),
  levelOfStudies: new FormControl<string>('Bachelor'),
  languageOfThesis: new FormControl<string>('English'),
  volumeEcts: new FormControl<number>(6),

  studentId: new FormControl<number | null>(null, Validators.required),
  reviewerId: new FormControl<number | null>(null, Validators.required),
  supervisorId: new FormControl<number | null>(null, Validators.required),
  coSupervisorIds: new FormControl<number[]>([])
}, { validators: this.rolesValidator.bind(this) });
  users = signal<User[] | null>(null);
  students = signal<Student[] | null>(null);

  ngOnInit(): void {
    this.userSerivce.getAll().subscribe((res) => this.users.set(res));
    this.studentService.getAll().subscribe((res) => this.students.set(res))
    this.userSerivce.getCommitteeMembersBySession(this.data.sessionId).subscribe((res) => this.committeeMembers.set(res));
    this.userSerivce.getHeadOfCommitteeBySession(this.data.sessionId).subscribe((res) => this.headOfCommittee.set(res));
  }

  submit() {
  if (this.form.invalid) return;

  const dto: NewThesisDTO = {
  titleEnglish: this.form.value.titleEnglish!,
  titleEstonian: this.form.value.titleEstonian ?? '',
  curriculum: this.form.value.curriculum!,
  levelOfStudies: this.form.value.levelOfStudies!,
  languageOfThesis: this.form.value.languageOfThesis!,
  volumeEcts: this.form.value.volumeEcts!,

  studentId: this.form.value.studentId!,
  reviewerId: this.form.value.reviewerId!,
  supervisorId: this.form.value.supervisorId!,
  coSupervisorIds: this.form.value.coSupervisorIds ?? [],

  sessionId: this.data.sessionId
};

  this.thesisService.addToSession(dto).subscribe({
    next: () => this.dialogRef.close(true)
  });
}

  close() {
    this.dialogRef.close(false);
  }

  rolesValidator(control: AbstractControl): ValidationErrors | null {
    const group = control as FormGroup;

    const reviewerId = group.get('reviewerId')?.value;
    const supervisorId = group.get('supervisorId')?.value;
    const coSupervisorIds = group.get('coSupervisorIds')?.value || [];

    const errors: any = {};

    if (reviewerId && supervisorId && reviewerId === supervisorId) {
      errors.reviewerSupervisorConflict = true;
    }

    if (reviewerId && coSupervisorIds.includes(reviewerId)) {
      errors.reviewerCoSupervisorConflict = true;
    }

    if (supervisorId && coSupervisorIds.includes(supervisorId)) {
      errors.supervisorCoSupervisorConflict = true;
    }

    return Object.keys(errors).length ? errors : null;
  }

  get committeeIds(): Set<number> {
    return new Set(this.committeeMembers().map(u => u.id));
  }

  get headId(): number | null {
    return this.headOfCommittee()?.id ?? null;
  }

  isInvalidReviewer(userId: number): boolean {
    return (
      this.committeeIds.has(userId) ||
      this.headId === userId
    );
  }
}
