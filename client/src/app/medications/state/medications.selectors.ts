
import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromMedications from './reducers/index';
import { MedicationsState } from './reducers/index';


export const selectMedicationsState =
 createFeatureSelector<MedicationsState>("medications");

 export const selectAllMedications = createSelector(
    selectMedicationsState,
    fromMedications.selectAll
 );



 export const selectMedicationById = (medicationId:number) => createSelector(
   selectMedicationsState,
   locationsState => locationsState.entities[medicationId]
  );

 export const areMedicationsLoaded = createSelector(
   selectMedicationsState,
   state => state.allMedicationsLoaded
 )
