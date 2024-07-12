import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsTableListRoutingModule } from './locations-table-list-routing.module';
import { LocationsTableListComponent } from './locations-table-list.component';


@NgModule({
  declarations: [
    LocationsTableListComponent
  ],
  imports: [
    CommonModule,
    LocationsTableListRoutingModule
  ],
  exports: [
    LocationsTableListComponent
  ]
})
export class LocationsTableListModule { }
