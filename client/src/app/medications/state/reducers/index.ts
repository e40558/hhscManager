import { isDevMode } from '@angular/core';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { compareMedications, Medication } from '../../model/medication.model';
import { MedicationActions } from '../medications.action.types';

export const medicationsFeatureKey = 'medications';

export interface MedicationsState  extends EntityState<Medication> {
  allMedicationsLoaded: boolean
}


export const adapter = createEntityAdapter<Medication>({
  sortComparer: compareMedications
});


export const initialMedicationState = adapter.getInitialState()

export const medicationsReducers =  createReducer (
  initialMedicationState,

  on(MedicationActions.allMedicationsLoaded, (state, action) =>
    adapter.addMany(action.medications,
                    {...state ,allMedicationsLoaded:true}) ),

on(MedicationActions.medicationUpdatedSucess, (state, action) =>
    adapter.updateOne(action.update, state)),

on(MedicationActions.medicationDeletedSuccess, (state, action) =>
  adapter.removeOne(action.id, state)),

on(MedicationActions.medicationAddSuccess, (state, action) =>
  adapter.addOne(action.medication, state)),

)






                  
export const {
selectAll
} = adapter.getSelectors();


