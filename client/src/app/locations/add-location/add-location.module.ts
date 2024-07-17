import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddLocationRoutingModule } from './add-location-routing.module';
import { AddLocationComponent } from './add-location.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddLocationComponent
  ],
  imports: [
    CommonModule,
    AddLocationRoutingModule,
    ReactiveFormsModule
  ]
})
export class AddLocationModule { }
