import { isDevMode } from '@angular/core';
import { routerReducer } from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from 'src/environments/environment.production';


export const initailState = {
  counter: 0,
};
export interface AppState {
  
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer

};

export function logger(reducer:ActionReducer<any>)
    : ActionReducer<any> {
    return (state, action) => {
        console.log("state before: ", state);
        console.log("action", action);

        return reducer(state, action);
    }

}


export const metaReducers: MetaReducer<AppState>[] =
    !environment.production ? [logger] : [];


