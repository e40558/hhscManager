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

export const locationsFeatureKey = 'locations';

export interface LocationState  extends EntityState<Location> {
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
                    {...state ,allCoursesLoaded:true}) )

)


export const metaReducers: MetaReducer<LocationState>[] = isDevMode() ? [] : [];
