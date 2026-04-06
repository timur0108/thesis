import { Component, inject, OnInit, signal } from '@angular/core';
import { Thesis } from '../thesis/thesis';
import { ThesisService } from '../thesis/thesis.service';
import { ThesisCardComponent } from '../thesis-card/thesis-card.component';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-assigned-reviews',
  imports: [ThesisCardComponent, MatCardModule],
  templateUrl: './assigned-reviews.component.html',
  styleUrl: './assigned-reviews.component.css'
})
export class AssignedReviewsComponent implements OnInit{

  assignedReviews = signal<Thesis[] | null>(null);
  thesisService = inject(ThesisService);

  ngOnInit(): void {
    this.thesisService.getAssignedReviews().subscribe({
      next: (res) => {
        this.assignedReviews.set(res);
        console.log(this.assignedReviews())
      }
    })
  }
}
