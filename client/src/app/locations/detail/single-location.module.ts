import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleLocationRoutingModule } from './single-location-routing.module';
import { SingleLocationComponent } from './single-location.component';


@NgModule({
  declarations: [
    SingleLocationComponent
  ],
  imports: [
    CommonModule,
    SingleLocationRoutingModule
  ]
})
export class SingleLocationModule { }
