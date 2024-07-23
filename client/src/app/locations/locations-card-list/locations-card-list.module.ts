import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsCardListRoutingModule } from './locations-card-list-routing.module';
import { LocationsCardListComponent } from './locations-card-list.component';
import { CardModule } from 'src/app/card/card.module';


@NgModule({
  declarations: [
    LocationsCardListComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    LocationsCardListRoutingModule
  ],
  exports:[
    LocationsCardListComponent
  ]
})
export class LocationsCardListModule { }
