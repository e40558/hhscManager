import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { catchError, concatMap, map, mergeMap, of, tap } from "rxjs";
import { LocationsHttpService } from "../services/locationsHttpService";
import { LocationActions } from "./location.action.types";
import { locationLoaded, allLocationsLoaded, locationDeletedSuccess,  } from "./locations.actions";


@Injectable()
export class LocationsEffects{

    constructor(private actions$: Actions, 
        private locationsHttpService: LocationsHttpService){

}
  
loadLocation$ = createEffect(
    ()=> this.actions$.pipe(
        ofType(LocationActions.loadLocation),
        mergeMap(action =>
            this.locationsHttpService.findLocationById(action.locationId)),
      map(location => locationLoaded({location})),
    ));

    loadLocations$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(LocationActions.loadAllLocations),
                concatMap(action =>
                    this.locationsHttpService.findAllLocations()),
                   map(locations => allLocationsLoaded({locations})
                )

    ));


    AddLocation$ = createEffect(
        () => this.actions$
           .pipe(
            ofType(LocationActions.addLocation),
            concatMap(action =>
                 this.locationsHttpService.saveLocation(action.location)),                  
                   map(location => LocationActions.locationAddSuccess({location}) ),                
                   
                    catchError((error)=>
                      of(LocationActions.locationAddedFailure({error:error}))
                      )
                 ));

    UdateLocation$ = createEffect(
        () => this.actions$
           .pipe(
            ofType(LocationActions.locationUpdatedSucess),
            concatMap(action => 
                this.locationsHttpService.updateLocation(
                action.update.id,
                action.update.changes
            )),catchError((error)=>
               of(LocationActions.locationUpdatedFailure({error:error})))
            ),
            {dispatch:false}

           );

   



            deleteLocation$ = createEffect(
                () => this.actions$
                   .pipe(
                    ofType(LocationActions.deleteLocation),
                    concatMap(action => 
                        this.locationsHttpService.deleteLocation(
                        action.id ).pipe(
                            map((data) => {
                                return locationDeletedSuccess({ id: action.id });
                              })
                            
                        )
                    ),catchError((error)=>
                       of(LocationActions.locationDeletedFailure({error:error})))
                    ),
                    {dispatch:false}
        
                   );

           
    

            

}
