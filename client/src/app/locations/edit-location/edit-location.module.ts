import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditLocationRoutingModule } from './edit-location-routing.module';
import { EditLocationComponent } from './edit-location.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditLocationComponent
  ],
  imports: [
    CommonModule,
    EditLocationRoutingModule,
    ReactiveFormsModule
  ]
})
export class EditLocationModule { }
