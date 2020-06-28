import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CentersEditComponent } from './centers-edit/centers-edit.component';
import { CentersAddComponent } from './centers-add/centers-add.component';
import { CentersListComponent } from './centers-list/centers-list.component';


const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: CentersListComponent },
  { path: 'add', component: CentersAddComponent },
  { path: 'edit', component: CentersEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentersRoutingModule { }
