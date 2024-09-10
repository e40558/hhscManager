import { inject } from "@angular/core";
import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable, tap, filter, first, finalize } from "rxjs";
import { AppState } from "src/app/reducers";
import { loadAllMedications } from "../state/medications.actions";
import { areMedicationsLoaded } from "../state/medications.selectors";




export const MedicationsResolver: ResolveFn<any> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    store: Store<AppState> = inject(Store<AppState>)
  ): Observable<any> => {
    
  let loading = false;
  return store
  .pipe(
     select(areMedicationsLoaded),
     tap(medicationsLoaded =>{
 
        if (!loading && !medicationsLoaded){
           loading = true;
           store.dispatch(loadAllMedications())
        }               }),
     filter(medicationsLoaded => medicationsLoaded),
     first(),
     finalize(()=> loading = false)
  );}