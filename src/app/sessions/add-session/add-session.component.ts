import { Component, OnInit, signal } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../user/user';
import { UserService } from '../../user/user.service';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-session',
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, MatDialogModule, MatSelectModule, MatOptionModule, CommonModule],
  templateUrl: './add-session.component.html',
  styleUrl: './add-session.component.css'
})
export class AddSessionComponent implements OnInit{
  dialogRef = inject(MatDialogRef<AddSessionComponent>);
  fb = inject(FormBuilder);
  userService = inject(UserService);
  users = signal<User[] | null>(null);

  form = this.fb.group({
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    committeeMemberIds: [[], Validators.required],
    headOfCommitteeId: ['', Validators.required]
  });


  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (res) => this.users.set(res)
    })
  }

  onSave() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
