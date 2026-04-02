import { Routes } from '@angular/router';
import { GradingComponent } from './grading/grading.component';
import { ThesisComponent } from './thesis/thesis.component';
import { LoginComponent } from './login/login.component';
import { ThesisesComponent } from './thesises/thesises.component';
import { authGuardGuard } from './auth-guard.guard';
import { SessionsComponent } from './sessions/sessions.component';

export const routes: Routes = [
    {
        path: 'grading',
        component: GradingComponent,
        canActivate: [authGuardGuard]
    },
    {
        path: 'thesis/:id',
        component: ThesisComponent,
        canActivate: [authGuardGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: ThesisesComponent,
        canActivate: [authGuardGuard]
    },
    {
        path: 'sessions',
        component: SessionsComponent,
        canActivate: [authGuardGuard]
    }
];
