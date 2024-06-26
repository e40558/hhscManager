import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { User } from 'src/model/user';
import { AuthActions } from '../actions.types';

export const authFeatureKey = 'auth';


export interface AuthState {
  user: User | undefined
}

export const initialAuthState: AuthState = {
  user: undefined
};

export const authReducer = createReducer(

  initialAuthState,

  on(AuthActions.login, (state, action) => {
      return {
          user: action.user
      }
  }),

  on(AuthActions.logout,(state, action) => {
    return{
      user: undefined
    }
  })



);