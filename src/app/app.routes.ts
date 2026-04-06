import { Routes } from '@angular/router';
import { GradingComponent } from './grading/grading.component';
import { ThesisComponent } from './thesis/thesis.component';
import { LoginComponent } from './login/login.component';
import { ThesisesComponent } from './thesises/thesises.component';
import { authGuardGuard } from './auth-guard.guard';
import { SessionsComponent } from './sessions/sessions.component';
import { AssignedReviewsComponent } from './assigned-reviews/assigned-reviews.component';
import { SupervisedThesesComponent } from './supervised-theses/supervised-theses.component';
import { CommitteeEvaluationsComponent } from './committee-evaluations/committee-evaluations.component';

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
    }, {
        path: 'assigned-reviews',
        component: AssignedReviewsComponent,
        canActivate: [authGuardGuard]
    }, {
        path: 'supervised',
        component: SupervisedThesesComponent,
        canActivate: [authGuardGuard]
    }, {
        path: 'committee',
        component: CommitteeEvaluationsComponent,
        canActivate: [authGuardGuard]
    }
];
