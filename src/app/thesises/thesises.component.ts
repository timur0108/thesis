import { Component, inject, OnInit } from '@angular/core';
import { Thesis } from '../thesis/thesis';
import { ThesisesService } from './thesises.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-thesises',
  imports: [RouterModule, CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './thesises.component.html',
  styleUrl: './thesises.component.css'
})
export class ThesisesComponent implements OnInit{

  thesises!: Thesis[];
  displayedColumns: string[] = ['studentName', 'levelOfStudies', 'languageOfThesis', 'titleEstonian', 'action'];

  private thesisesService: ThesisesService = inject(ThesisesService);

  ngOnInit() {
    this.thesisesService.getAllThesises().subscribe({
      next: (data) => this.thesises = data
    })
  }
}
