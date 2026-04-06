import { Component, ComponentRef, inject, Input, input, OnInit, signal, ViewContainerRef } from '@angular/core';
import { Thesis } from './thesis';
import { ActivatedRoute } from '@angular/router';
import { ThesisService } from './thesis.service';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { GradingComponent } from '../grading/grading.component';
import { CommonModule } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {ChangeDetectionStrategy} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatButton } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HasAuthorityDirective } from '../auth/has-authority.directive';
import { ReviewerThesisViewComponent } from './reviewer-thesis-view/reviewer-thesis-view.component';
import { CommitteeMemberThesisViewComponent } from './committee-member-thesis-view/committee-member-thesis-view.component';
import { HeadOfCommitteeThesisViewComponent } from './head-of-committee-thesis-view/head-of-committee-thesis-view.component';
import { SupervisorThesisViewComponent } from './supervisor-thesis-view/supervisor-thesis-view.component';
import { FinalGrade } from '../grading/grade';
import { GradingService } from '../grading/grading.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-thesis',
  imports: [MatIconModule, DatePipe, MatCardModule, MatDividerModule, MatChipsModule, GradingComponent,
     CommonModule, MatExpansionModule, MatButton, MatProgressSpinnerModule, HasAuthorityDirective, 
     ReviewerThesisViewComponent, CommitteeMemberThesisViewComponent, HeadOfCommitteeThesisViewComponent, SupervisorThesisViewComponent],
  templateUrl: './thesis.component.html',
  styleUrl: './thesis.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0px',
        opacity: 0,
        overflow: 'hidden'
      })),
      state('expanded', style({
        height: '*',
        opacity: 1
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class ThesisComponent {
  readonly panelOpenState = signal(false);
  thesis = signal<Thesis | null>(null);
  private activatedRoute = inject(ActivatedRoute);
  private thesisService: ThesisService = inject(ThesisService);
  private gradingService: GradingService = inject(GradingService);
  showGrading = false;
  finalGrade = signal<FinalGrade | null>(null);
  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      const thesisId = params['id'];

      this.thesisService.getThesisById(thesisId).subscribe((data) => {
        this.thesis.set(data);
      })
      this.gradingService.getFinalGrade(thesisId).subscribe({
        next: (res) => this.finalGrade.set(res)
      })
    })
  }
}
