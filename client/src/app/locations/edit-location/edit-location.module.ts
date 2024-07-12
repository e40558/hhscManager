import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditLocationRoutingModule } from './edit-location-routing.module';
import { EditLocationComponent } from './edit-location.component';


@NgModule({
  declarations: [
    EditLocationComponent
  ],
  imports: [
    CommonModule,
    EditLocationRoutingModule
  ]
})
export class EditLocationModule { }
