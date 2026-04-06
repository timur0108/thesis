import { Component } from '@angular/core';
import { signal } from '@angular/core';
import { inject } from '@angular/core';
import { Thesis } from '../thesis/thesis';
import { ThesisService } from '../thesis/thesis.service';
import { ThesisCardComponent } from '../thesis-card/thesis-card.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-supervised-theses',
  imports: [ThesisCardComponent, MatCardModule],
  templateUrl: './supervised-theses.component.html',
  styleUrl: './supervised-theses.component.css'
})
export class SupervisedThesesComponent {
  supervisedTheses = signal<Thesis[] | null>(null);
  thesisService = inject(ThesisService);

  ngOnInit(): void {
    this.thesisService.getSupervised().subscribe({
      next: (res) => {
        this.supervisedTheses.set(res);
        
      }
    })
  }
}
