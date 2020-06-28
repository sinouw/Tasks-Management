import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentsListComponent } from './agents-list/agents-list.component';
import { AgentsAddComponent } from './agents-add/agents-add.component';
import { AgentsEditComponent } from './agents-edit/agents-edit.component';


const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: AgentsListComponent },
  { path: 'add', component: AgentsAddComponent },
  { path: 'edit', component: AgentsEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentsRoutingModule { }
