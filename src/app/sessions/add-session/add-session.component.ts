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

    committeeMemberIds: this.fb.control<number[]>([], Validators.required),

    headOfCommitteeId: this.fb.control<number | null>(null, Validators.required)
  });


  ngOnInit(): void {
    this.userService.getAll().subscribe({
      next: (res) => this.users.set(res)
    })

    this.form.get('headOfCommitteeId')?.valueChanges.subscribe((headId) => {
    const current = this.form.get('committeeMemberIds')?.value ?? [];

    if (headId && current.includes(headId)) {
      this.form.get('committeeMemberIds')?.setValue(
        current.filter((id: number) => id !== headId)
      );
    }
  });
  }

  onSave() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  get headId(): number | null {
    return this.form.get('headOfCommitteeId')?.value || null;
  }

  get committeeIds(): number[] {
    return this.form.get('committeeMemberIds')?.value || [];
  }
}
