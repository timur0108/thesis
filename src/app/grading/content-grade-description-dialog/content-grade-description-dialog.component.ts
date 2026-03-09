import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-content-grade-description-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './content-grade-description-dialog.component.html',
  styleUrl: './content-grade-description-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentGradeDescriptionDialogComponent {

}
