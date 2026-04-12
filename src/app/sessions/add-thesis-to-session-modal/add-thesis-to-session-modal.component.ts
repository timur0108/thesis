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


@Component({
  selector: 'app-add-thesis-to-session-modal',
  imports: [MatInputModule, FormsModule, ReactiveFormsModule, MatSelectModule, MatDialogModule],
  templateUrl: './add-thesis-to-session-modal.component.html',
  styleUrl: './add-thesis-to-session-modal.component.css'
})
export class AddThesisToSessionModalComponent implements OnInit{
  userSerivce = inject(UserService);
  studentService = inject(StudentService);
  thesisService = inject(ThesisService);

  dialogRef = inject(MatDialogRef<AddThesisToSessionModalComponent>);
  data = inject(MAT_DIALOG_DATA);

  form = new FormGroup({
    titleEnglish: new FormControl('', Validators.required),
    titleEstonian: new FormControl(''),
    curriculum: new FormControl('', Validators.required),
    levelOfStudies: new FormControl('Bachelor'),
    languageOfThesis: new FormControl('English'),
    volumeEcts: new FormControl(6),

    studentId: new FormControl(null, Validators.required),
    reviewerId: new FormControl(null, Validators.required),
    supervisorId: new FormControl(null, Validators.required),
    coSupervisorIds: new FormControl([])
  });

  users = signal<User[] | null>(null);
  students = signal<Student[] | null>(null);

  ngOnInit(): void {
    this.userSerivce.getAll().subscribe((res) => this.users.set(res));
    this.studentService.getAll().subscribe((res) => this.students.set(res))
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
}
