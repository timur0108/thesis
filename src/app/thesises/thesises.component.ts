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



@Component({
  selector: 'app-thesises',
  imports: [MatDialogModule, MatInputModule, MatFormFieldModule ,MatIconModule, MatCardModule, RouterModule, CommonModule, MatTableModule, MatButtonModule, HasAuthorityDirective, MatDatepickerModule,
  MatNativeDateModule],
  templateUrl: './thesises.component.html',
  styleUrl: './thesises.component.css'
})
export class ThesisesComponent implements OnInit{

  thesises!: Thesis[];
  displayedColumns: string[] = ['studentName', 'levelOfStudies', 'languageOfThesis', 'titleEstonian', 'action'];
  private dialog = inject(MatDialog)

  private thesisesService: ThesisesService = inject(ThesisesService);

  ngOnInit() {
    this.thesisesService.getAllThesises().subscribe({
      next: (data) => this.thesises = data
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
}
