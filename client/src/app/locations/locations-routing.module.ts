import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationResolver } from './services/location.resolver';

const routes: Routes = [
  {
     path: '', loadChildren: () => import('./location/location.module').then(m => m.LocationModule),
     
    resolve: {
        locations: LocationResolver
    }
  },

  { path: 'editLocation', loadChildren: () => import('../locations/edit-location/edit-location.module').then(m => m.EditLocationModule) },
                       
  { path: 'details/:id', loadChildren: () => import('../locations/single-location/single-location.module').then(m => m.SingleLocationModule) },
     
  
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule { }
