import {createAction, props} from '@ngrx/store';
import { User } from 'src/model/user';


export const login = createAction(
    "[Login Page] User Login",
    props<{user: User}>()
);



export const logout = createAction(
  "[Side Menu] Logout"
);