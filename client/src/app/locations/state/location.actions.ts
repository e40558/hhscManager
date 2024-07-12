import { createAction, props } from "@ngrx/store";
import { Location} from '../model/location.model';





export const loadAllLocations = createAction(
    "[Locations Resolver] Load All Locations"
);


export const allLocationsLoaded = createAction(
    "[Load Locations Effect] All Location Loaded",
    props<{locations: Location[]}>()
);