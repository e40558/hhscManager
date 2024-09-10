import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { catchError, concatMap, map, mergeMap, of, tap } from "rxjs";
import { MedicationsHttpService } from "../services/medicationsHttpService";
import { MedicationActions } from "./medications.action.types";
import { allLocationsLoaded, locationDeletedSuccess } from "src/app/locations/state/locations.actions";
import { allMedicationsLoaded, medicationDeletedSuccess, medicationLoaded } from "./medications.actions";


@Injectable()
export class MedicationsEffects{

    constructor(private actions$: Actions, 
        private medicationsHttpService: MedicationsHttpService){

}
  
loadMedication$ = createEffect(
    ()=> this.actions$.pipe(
        ofType(MedicationActions.loadMedication),
        mergeMap(action =>
            this.medicationsHttpService.findMedicationById(action.meidicationId)),
        map(medication => medicationLoaded({medication})),
        catchError((error)=>
            of(MedicationActions.medicationAddedFailure({error:error}))
        )

    ));

    loadMedications$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(MedicationActions.loadAllMedications),
                concatMap(action =>
                    this.medicationsHttpService.findAllMedications()),
                   map(medications => allMedicationsLoaded({medications})
                ),
                catchError((error)=>
                    of(MedicationActions.allMedicationsLoadedFailure({error:error}))
                )

    ));


    AddMedication$ = createEffect(
        () => this.actions$
           .pipe(
            ofType(MedicationActions.addMedication),
            concatMap(action =>
                 this.medicationsHttpService.saveLocation(action.medication)),                  
                   map(medication => MedicationActions.medicationAddSuccess({medication}) ),                
                   
                    catchError((error)=>
                      of(MedicationActions.medicationAddedFailure({error:error}))
                      )
                 ));

    UdateMedication$ = createEffect(
        () => this.actions$
           .pipe(
            ofType(MedicationActions.medicationUpdatedSucess),
            concatMap(action => 
                this.medicationsHttpService.updateMedication(
                action.update.id,
                action.update.changes
            )),catchError((error)=>
               of(MedicationActions.medicationUpdatedFailure({error:error})))
            ),
            {dispatch:false}

           );

   



            deleteMedication$ = createEffect(
                () => this.actions$
                   .pipe(
                    ofType(MedicationActions.deleteMedication),
                    concatMap(action => 
                        this.medicationsHttpService.deleteMedication(
                        action.id ).pipe(
                            map((data) => {
                                return medicationDeletedSuccess({ id: action.id });
                              })
                            
                        )
                    ),catchError((error)=>
                       of(MedicationActions.medicationDeletedFailure({error:error})))
                    ),
                    {dispatch:false}
        
                   );

           
    

            

}
