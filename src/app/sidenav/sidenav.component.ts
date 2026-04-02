import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { HasAuthorityDirective } from '../auth/has-authority.directive';

@Component({
  selector: 'app-sidenav',
  imports: [MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule, RouterOutlet, RouterModule, HasAuthorityDirective],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
