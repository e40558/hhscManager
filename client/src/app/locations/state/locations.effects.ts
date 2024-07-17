import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { catchError, concatMap, map, mergeMap, of } from "rxjs";
import { LocationsHttpService } from "../services/locationsHttpService";
import { LocationActions } from "./location.action.types";
import { locationLoaded, allLocationsLoaded } from "./locations.actions";


@Injectable()
export class CoursesEffects{

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

    AddCourse$ = createEffect(
        () => this.actions$
           .pipe(
            ofType(LocationActions.addLocationSuccess),
            concatMap(action =>
                 this.locationsHttpService.saveLocation(action.location).pipe(
                    map((location)=> 
                        LocationActions.addLocationSuccess({ location:location})
                    ),
                    catchError((error)=>
                      of(LocationActions.locationAddedFailure({error:error}))
                      )
                 )
                 
                 ),
            ),
            {dispatch:false});

   
    

            

}