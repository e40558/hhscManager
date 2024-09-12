import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumersListRoutingModule } from './consumers-list-routing.module';
import { ConsumersListComponent } from './consumers-list.component';


@NgModule({
  declarations: [
    ConsumersListComponent
  ],
  imports: [
    CommonModule,
    ConsumersListRoutingModule
  ],
  exports:[
    ConsumersListComponent
  ]
})
export class ConsumersListModule { }
