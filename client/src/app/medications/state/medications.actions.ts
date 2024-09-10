import { createAction, props } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { Medication } from "../model/medication.model";





export const setLoading = createAction(
    '[Medications Resolver] Set loading'
)

export const loadAllMedications = createAction(
    "[Medications Resolver] Load All Medications"
);

export const allMedicationsLoaded = createAction(
    "[Load Medications Effect] All Medications Loaded",
    props<{ medications: Medication[] }>()
);


export const allMedicationsLoadedFailure = createAction(
    '[Medication Api] Medication Added Failure',
    props<{ error: string }>()
)

export const allMedicationsLoadedMessage = createAction(
    '[Medication Api]  Medication Added Failure',
    (error: string) => ({ error })
)


export const loadMedication = createAction(
    '[View Medication Page] Medications Requested',
    props<{ meidicationId: number }>()
);

export const medicationLoaded = createAction(
    '[Medication API] Medication Loaded',
    props<{ medication: Medication }>()
);





export const addMedication = createAction(
    '[Medication Add Component] Add Medications',
    props<{ medication: Medication }>());

export const medicationAddSuccess = createAction(
    '[medication/API] Add Medication Success',
    props<{ medication: Medication }>());

export const medicationAddedFailure = createAction(
    '[Medication Api] Medication Added Failure',
    props<{ error: string }>()
)

export const medicationAddedFailureMessage = createAction(
    '[Medication Api]  Medication Added Failure',
    (error: string) => ({ error })
)


export const medicationLoadedSuccess = createAction(
    '[Medication Resolver] Medication Loaded Success',
    props<{ medication: Medication[] }>()
)

export const deleteMedication = createAction(
    '[Medication Table List] Delete Medication',
    props<{ id: number }>()
)



export const medicationDeletedSuccess = createAction(
    '[Medication Api] Medication Deleted Success',
    props<{ id: number }>()
)



//locationAddedFailureMessage('Failure to Load')



export const medicationDeletedFailure = createAction(
    '[Medication Api] Medication Deleted Failure',
    props<{ error: string }>()
)


//locationDeletedFailure({error: 'Failure to Load'})


export const medicationDeletedFailureMessage = createAction(
    '[Medication Api]  Medication Deleted Failure',
    (error: string) => ({ error })
)

//locationDeletedFailureMessage('Failure to Load')








export const medicationUpdatedSucess = createAction(
    "[Edit Medication Dialog] Medication Updated",
    props<{update: Update<Medication>}>()
    );
  

export const medicationUpdatedFailure = createAction(
    '[Medication Api] Medication Update Failure',
    props<{ error: string }>()
)


//locationUpdatededFailure({error: 'Failure to Load'})


export const medicationUpdatededFailureMessage = createAction(
    '[Location Api]  Location Updated Failure',
    (error: string) => ({ error })
)

//locationUpdatededFailureMessage('Failure to Load')