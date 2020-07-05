import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentsRoutingModule } from './agents-routing.module';
import { AgentsListComponent } from './agents-list/agents-list.component';
import { AgentsAddComponent } from './agents-add/agents-add.component';
import { AgentsEditComponent } from './agents-edit/agents-edit.component';
import { MaterialModule } from 'app/core/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AgentsListComponent, AgentsAddComponent, AgentsEditComponent],
  imports: [
    CommonModule,
    AgentsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AgentsModule { }
