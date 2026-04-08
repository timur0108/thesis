import { Component, Input } from '@angular/core';
import { Thesis } from '../thesis/thesis';
import { User } from '../user/user';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-thesis-overview',
  imports: [MatIconModule, MatDividerModule, CommonModule, MatCardModule],
  templateUrl: './thesis-overview.component.html',
  styleUrl: './thesis-overview.component.css'
})
export class ThesisOverviewComponent {
  @Input() thesis!: Thesis;

  getFullNameWithEmail(user?: User): string {
    if (!user) return 'N/A';
    const fullName = `${user.name} ${user.secondName ?? ''}`.trim();
    return `${fullName} (${user.email ?? 'No email'})`;
  }

  getFullNamesWithEmails(users?: User[]): string {
    if (!users || users.length === 0) return 'N/A';
    return users.map(u => this.getFullNameWithEmail(u)).join(', ');
  }
}
