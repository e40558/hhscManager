import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsRoutingModule } from './locations-routing.module';
import { StoreModule } from '@ngrx/store';
import { locationsReducers } from './state/reducers';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    ReactiveFormsModule,
    //EffectsModule.forFeature([CoursesEffects]),
    StoreModule.forFeature("courses", locationsReducers) ]
})
export class LocationsModule { }
