import { createAction, props } from "@ngrx/store";
import { Location} from '../model/location.model';
import { Update } from "@ngrx/entity";





export const setLoading = createAction(
    '[Locations Resolver] Set loading'
)

export const loadAllLocations = createAction(
    "[Locations Resolver] Load All Locations"
);

export const allLocationsLoaded = createAction(
    "[Load Locations Effect] All Courses Loaded",
    props<{ locations: Location[] }>()
);


export const loadLocation = createAction(
    '[View Location Page] Course Requested',
    props<{ locationId: number }>()
);

export const locationLoaded = createAction(
    '[Location API] Location Loaded',
    props<{ location: Location }>()
);





export const addLocationSuccess = createAction(
    '[Location/API] Add Course',
    props<{ location: Location }>());

export const locationAddedFailure = createAction(
    '[Location Api] Location Added Failure',
    props<{ error: string }>()
)


//locationAddedFailure({error: 'Failure to Load'})


export const locationAddedFailureMessage = createAction(
    '[Location Api]  Location Added Failure',
    (error: string) => ({ error })
)


export const locationLoadedSuccess = createAction(
    '[Location Resolver] Location Loaded Success',
    props<{ location: Location[] }>()
)


export const locationAddedSucess = createAction(
    '[Location Api] Location Added Success',
    props<{ location: Location }>()
)




export const locationDeletedSucess = createAction(
    '[Location Api] Location Deleted Success',
    props<{ location: Location }>()
)



//locationAddedFailureMessage('Failure to Load')



export const locationDeletedFailure = createAction(
    '[Location Api] Location Deleted Failure',
    props<{ error: string }>()
)


//locationDeletedFailure({error: 'Failure to Load'})


export const locationDeletedFailureMessage = createAction(
    '[Location Api]  Location Deleted Failure',
    (error: string) => ({ error })
)

//locationDeletedFailureMessage('Failure to Load')








export const locationUpdatedSucess = createAction(
    "[Edit Location Dialog] Location Updated",
    props<{update: Update<Location>}>()
    );
  

export const locationUpdatedFailure = createAction(
    '[Location Api] Location Update Failure',
    props<{ error: string }>()
)


//locationUpdatededFailure({error: 'Failure to Load'})


export const locationUpdatededFailureMessage = createAction(
    '[Location Api]  Location Updated Failure',
    (error: string) => ({ error })
)

//locationUpdatededFailureMessage('Failure to Load')