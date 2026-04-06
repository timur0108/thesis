import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Thesis } from '../thesis/thesis';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-thesis-card',
  imports: [MatDivider, RouterModule, CommonModule, MatIconModule, MatCardModule, MatChipsModule],
  templateUrl: './thesis-card.component.html',
  styleUrl: './thesis-card.component.css'
})
export class ThesisCardComponent {
  @Input() thesis!: Thesis;
}
