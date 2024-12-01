import { inject } from "@angular/core";
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable, tap, filter, first, finalize } from "rxjs";
import { AppState } from "src/app/reducers";
import { loadAllLocations } from "../state/locations.actions";
import { areLocationsLoaded } from "../state/locations.selectors";



export const LocationsResolver: ResolveFn<any> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    store: Store<AppState> = inject(Store<AppState>)
  ): Observable<any> => {
    
  let loading = false;
  return store
  .pipe(
     select(areLocationsLoaded),
     tap(locationsLoaded =>{
 
        if (!loading && !locationsLoaded){
           loading = true;
           store.dispatch(loadAllLocations())
        }               }),
     filter(locationsLoaded => locationsLoaded),
     first(),
     finalize(()=> loading = false)
  );}