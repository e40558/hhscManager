import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from './counter/counter.component';
import { StoreModule } from '@ngrx/store';
import * as fromCounter from './reducers';



@NgModule({
  declarations: [
    CounterComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromCounter.counterFeatureKey, fromCounter.reducers )
  ]
})
export class CounterModule { }
