import { Component, inject, OnInit } from '@angular/core';
import { Thesis } from '../thesis/thesis';
import { ThesisesService } from './thesises.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { HasAuthorityDirective } from '../auth/has-authority.directive';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddThesisDialogComponent } from '../add-thesis-dialog/add-thesis-dialog.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { signal } from '@angular/core';
import { ThesisService } from '../thesis/thesis.service';
import { ThesisCardComponent } from '../thesis-card/thesis-card.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { computed } from '@angular/core';
import { Session } from '../sessions/session';
import { SessionService } from '../sessions/sessions.service';


@Component({
  selector: 'app-thesises',
  imports: [MatSelectModule, MatOptionModule, ThesisCardComponent, MatTabsModule, MatDialogModule, MatInputModule, MatFormFieldModule ,MatIconModule, MatCardModule, RouterModule, CommonModule, MatTableModule, MatButtonModule, HasAuthorityDirective, MatDatepickerModule,
  MatNativeDateModule],
  templateUrl: './thesises.component.html',
  styleUrl: './thesises.component.css'
})
export class ThesisesComponent implements OnInit{

  thesises = signal<Thesis[] | null>(null);
  displayedColumns: string[] = ['studentName', 'levelOfStudies', 'languageOfThesis', 'titleEstonian', 'finalGrade', 'action'];
  private dialog = inject(MatDialog)

  asSupervisor = signal<Thesis[] | null>(null);
  asReviewer = signal<Thesis[] | null>(null);
  asCommittee = signal<Thesis[] | null>(null);

  searchTerm = signal('');
  statusFilter = signal('');

  activeTab = signal(0);

  sessions = signal<Session[] | null>(null);
  selectedSessionId = signal<number | null>(null);

  private thesisesService: ThesisesService = inject(ThesisesService);
  private thesisService: ThesisService = inject(ThesisService);
  private sessionService: SessionService = inject(SessionService);

  filteredList = computed(() => {
    let list: Thesis[] = [];

    switch (this.activeTab()) {
      case 0:
        list = this.thesises() || [];
        break;
      case 1:
        list = this.asSupervisor() || [];
        break;
      case 2:
        list = this.asReviewer() || [];
        break;
      case 3:
        list = this.asCommittee() || [];
        break;
    }

    const search = this.searchTerm();
    const status = this.statusFilter();

    return list.filter(t => {
      const matchesSearch =
        !search ||
        t.titleEstonian?.toLowerCase().includes(search) ||
        t.titleEnglish?.toLowerCase().includes(search) ||
        t.studentName?.toLowerCase().includes(search);

      const matchesStatus =
        !status ||
        (status === 'GRADED' && t.finalGradeLetter) ||
        (status === 'PENDING' && !t.finalGradeLetter);

      const selectedSession = this.selectedSessionId();
        const matchesSession = !selectedSession || t.sessionId === selectedSession;

      return matchesSearch && matchesStatus && matchesSession;
    });
  });

  ngOnInit() {
    this.getAllTheses();
    this.getThesesAsCommittee();
    this.getThesesAsReviewer();
    this.getThesesAsSupervisor();
    this.getAllSessions();
  }

  onTabChange(event: MatTabChangeEvent) {
    this.activeTab.set(event.index);

    switch (event.index) {
      case 0:
        if (!this.thesises || this.thesises.length < 1) {
          this.getAllTheses();
        }
        break;
      
      case 1:
          if (!this.asSupervisor()) {
            this.getThesesAsSupervisor();
          }
          break;
      
      case 2: 
        if (!this.asReviewer()) {
          this.getThesesAsReviewer();
        }    
        break;
      case 3:
        if (!this.asCommittee()) {
          this.getThesesAsCommittee();
        }
        break;  
    }
    this.resetFilters();
  }

  onSessionChange(sessionId: number | null) {
    this.selectedSessionId.set(sessionId);
  }

  getAllSessions() {
    this.sessionService.getAll().subscribe({
      next: (res) => this.sessions.set(res)
    })
  }

  getAllTheses() {
    this.thesisService.getAssigned().subscribe({
      next: (data) => this.thesises.set(data)
    })
  }

  getThesesAsSupervisor() {
    this.thesisService.getSupervised().subscribe({
      next: (res) => this.asSupervisor.set(res)
    })
  }

  getThesesAsReviewer() {
    this.thesisService.getAssignedReviews().subscribe({
      next: (res) => this.asReviewer.set(res)
    })
  }

  getThesesAsCommittee() {
    this.thesisService.getCommittee().subscribe({
      next: (res) => this.asCommittee.set(res)
    })
  }

  onAddThesis() {
    this.dialog.open(AddThesisDialogComponent, {
      width: '50vw',
      height: '80vh',
      maxWidth: '100vw',
      disableClose: false
    });
  }

  onSearch(event: any) {
    this.searchTerm.set(event.target.value.toLowerCase());
  }

  onStatusChange(status: string) {
    this.statusFilter.set(status);
  }

  resetFilters() {
    this.searchTerm.set('');
    this.statusFilter.set('');
    this.selectedSessionId.set(null);
  }
}
