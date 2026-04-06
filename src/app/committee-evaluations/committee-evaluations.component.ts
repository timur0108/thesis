import { Component, OnInit } from '@angular/core';
import { signal } from '@angular/core';
import { Thesis } from '../thesis/thesis';
import { inject } from '@angular/core';
import { ThesisService } from '../thesis/thesis.service';
import { MatCardModule } from '@angular/material/card';
import { ThesisCardComponent } from '../thesis-card/thesis-card.component';

@Component({
  selector: 'app-committee-evaluations',
  imports: [MatCardModule, ThesisCardComponent],
  templateUrl: './committee-evaluations.component.html',
  styleUrl: './committee-evaluations.component.css'
})
export class CommitteeEvaluationsComponent implements OnInit {
  thesises = signal<Thesis[] | null>(null);
  thesisService = inject(ThesisService);

  ngOnInit(): void {
    this.thesisService.getCommittee().subscribe({
      next: (res) => {
        this.thesises.set(res);
      }
    })
  }
}
