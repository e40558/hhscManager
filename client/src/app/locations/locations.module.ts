import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsRoutingModule } from './locations-routing.module';
import { StoreModule } from '@ngrx/store';
import { locationsReducers } from './state/reducers';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { LocationsEffects } from './state/locations.effects';
import { LocationsHttpService } from './services/locationsHttpService';


@NgModule({
  declarations: [
  
  ],
  providers:[
    LocationsHttpService
  ],
  imports: [
    CommonModule,
    LocationsRoutingModule,    
    ReactiveFormsModule,
    EffectsModule.forFeature([LocationsEffects]),
    StoreModule.forFeature("locations", locationsReducers) ]
})
export class LocationsModule { }
