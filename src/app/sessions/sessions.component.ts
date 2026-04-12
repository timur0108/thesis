import { Component, inject, OnInit, signal } from '@angular/core';
import { Session, SessionWithThesesDTO } from './session';
import { SessionService } from './sessions.service';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddSessionComponent } from './add-session/add-session.component';

@Component({
  selector: 'app-sessions',
  imports: [MatTableModule,
    MatCardModule,
    MatIconModule,
    NgIf,
    NgFor, DatePipe, MatButtonModule, RouterModule],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.css'
})
export class SessionsComponent implements OnInit{

  sessionService = inject(SessionService);

  sessions = signal<SessionWithThesesDTO[] | null>(null);

  dialog = inject(MatDialog);

  displayedColumns = ['id', 'startDate', 'endDate', 'action'];

  ngOnInit(): void {
    this.sessionService.getAllWithTheses().subscribe({
      next: (res) => this.sessions.set(res)
    })
  }

  onAddSession() {
    const dialogRef = this.dialog.open(AddSessionComponent, {
    
   
    
  });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.sessionService.createSession(result).subscribe({
            next: (createdSession) => {
              this.sessionService.getAllWithTheses().subscribe(res => this.sessions.set(res));
            },
            error: (err) => {
              console.error('Failed to create session', err);
            }
            });
      }
    });
  }
}
