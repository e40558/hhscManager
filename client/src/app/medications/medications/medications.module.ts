import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicationsRoutingModule } from './medications-routing.module';
import { MedicationsComponent } from './medications.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { LocationsEffects } from 'src/app/locations/state/locations.effects';
import { locationsReducers } from 'src/app/locations/state/reducers';
import { medicationsReducers } from '../state/reducers';
import { MedicationsEffects } from '../state/medications.effects';


@NgModule({
  declarations: [
    MedicationsComponent
  ],
  imports: [
    CommonModule,
    MedicationsRoutingModule,
    EffectsModule.forFeature([MedicationsEffects]),
    StoreModule.forFeature("medications", medicationsReducers)
  ]
})
export class MedicationsModule { }
