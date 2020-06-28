import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentersRoutingModule } from './centers-routing.module';
import { CentersListComponent } from './centers-list/centers-list.component';
import { CentersAddComponent } from './centers-add/centers-add.component';
import { CentersEditComponent } from './centers-edit/centers-edit.component';


@NgModule({
  declarations: [CentersListComponent, CentersAddComponent, CentersEditComponent],
  imports: [
    CommonModule,
    CentersRoutingModule
  ]
})
export class CentersModule { }
