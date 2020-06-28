import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'profile',   component: UserProfileComponent },
    { path:'events',loadChildren:()=> import('../../layouts/admin-layout/events/events.module').then(m=>m.EventsModule)},
    { path:'agents',loadChildren:()=> import('../../layouts/admin-layout/agents/agents.module').then(m=>m.AgentsModule)},
];
