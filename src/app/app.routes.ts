import { Routes } from '@angular/router';
import { GradingComponent } from './grading/grading.component';
import { ThesisComponent } from './thesis/thesis.component';
import { LoginComponent } from './login/login.component';
import { ThesisesComponent } from './thesises/thesises.component';

export const routes: Routes = [
    {
        path: 'grading',
        component: GradingComponent
    },
    {
        path: 'thesis/:id',
        component: ThesisComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: ThesisesComponent
    }
];
