
import {tap, first, map} from 'rxjs/operators';

import {ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import * as _ from 'lodash';
import {Inject, Injectable, inject} from "@angular/core";


export const roleGuard: CanActivateFn = (route, state) => {



const allowedRoles = route.data['roles'];

const router = inject(Router);
const authService = inject(AuthService);   
      
        return authService.user$.pipe(
            map(user => _.intersection(allowedRoles, user.roles).length > 0 ),
            first(),
            tap(allowed => {
                if (!allowed) {
                    router.navigateByUrl('/');
                }
            }),);


    }