import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsumersRoutingModule } from './consumers-routing.module';
import { ConsumersListModule } from "./consumers-list/consumers-list.module";
import { IpcComponent } from './ipc/ipc.component';
import { ConsumersComponent } from './consumers.component';


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
