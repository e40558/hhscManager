
import {createFeatureSelector, createSelector} from '@ngrx/store';
import { LocationsState } from './reducers';
import * as fromLocations from './reducers/index';


export const selectLocationsState =
 createFeatureSelector<LocationsState>("locations");

 export const selectAllLocations = createSelector(
    selectLocationsState,
    fromLocations.selectAll
 );

 //export const selectLoadingState = 


 export const selectLocationById = (locationId:number) => createSelector(
   selectLocationsState,
   locationsState => locationsState.entities[locationId]
  );

 export const selectLocaionUrl = (locationUrl:string) => createSelector(
   selectLocationsState,
   locationsState => locationsState.entities[locationUrl]
  );


 export const areLocationsLoaded = createSelector(
   selectLocationsState,
   state => state.allLocationsLoaded
 )


 //export const isLoading = createSelector(
 //  selectLocationsState,
 //  state => state.isLoading
 //)