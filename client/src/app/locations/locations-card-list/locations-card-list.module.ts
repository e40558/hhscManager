import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsCardListRoutingModule } from './locations-card-list-routing.module';
import { LocationsCardListComponent } from './locations-card-list.component';


@NgModule({
  declarations: [
    LocationsCardListComponent
  ],
  imports: [
    CommonModule,
    LocationsCardListRoutingModule
  ],
  exports:[
    LocationsCardListComponent
  ]
})
export class LocationsCardListModule { }
