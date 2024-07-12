import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';



export const counterFeatureKey = 'counter';


export const counterInitialState = {
  counter:0
}


export interface CounterState  {


}

export const reducers: ActionReducerMap<CounterState> = {
  counterInitialState

};


