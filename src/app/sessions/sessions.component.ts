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
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { AddThesisToSessionModalComponent } from './add-thesis-to-session-modal/add-thesis-to-session-modal.component';
import { HasAuthorityDirective } from '../auth/has-authority.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sessions',
  imports: [CommonModule, MatTableModule,MatExpansionModule,
  MatListModule, HasAuthorityDirective,
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

  onAddThesis(sessionId: number) {
    const dialogRef = this.dialog.open(AddThesisToSessionModalComponent, {
      width: '700px',
      maxWidth: '95vw',
      data: { sessionId }   // 🔥 pass sessionId here
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // refresh sessions after creating thesis
        this.sessionService.getAllWithTheses().subscribe(res => {
          this.sessions.set(res);
        });
      }
    });
  }
}
