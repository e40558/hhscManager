import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumersRoutingModule } from './consumers-routing.module';
import { ConsumersComponent } from './consumers/consumers.component';
import { ConsumersListModule } from "./consumers-list/consumers-list.module";


@NgModule({
  declarations: [
    ConsumersComponent
  ],
  imports: [
    CommonModule,
    ConsumersRoutingModule,
    ConsumersListModule
]
})
export class ConsumersModule { }
