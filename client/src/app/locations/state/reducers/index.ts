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
import { LocationActions } from '../location.action.types';
import { compareLocations, Location } from '../../model/location.model';
import { LocalizedString } from '@angular/compiler';

export const locationsFeatureKey = 'locations';

export interface LocationsState  extends EntityState<Location> {
  allLocationsLoaded: boolean
}


export const adapter = createEntityAdapter<Location>({
  sortComparer: compareLocations
});


export const initialLocationState = adapter.getInitialState()

export const locationsReducers =  createReducer (
  initialLocationState,

  on(LocationActions.allLocationsLoaded, (state, action) =>
    adapter.addMany(action.locations,
                    {...state ,allLocationsLoaded:true}) ),

on(LocationActions.locationUpdatedSucess, (state, action) =>
    adapter.updateOne(action.update, state)),

on(LocationActions.locationAddSuccess, (state, action) =>
  adapter.addOne(action.location, state)),

)






                  
export const {
selectAll
} = adapter.getSelectors();


