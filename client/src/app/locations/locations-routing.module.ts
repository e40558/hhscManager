import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
     path: '', loadChildren: () => import('./location/location.module').then(m => m.LocationModule)
  },
  {
    path: 'addLocation', loadChildren: () => import('./add-location/add-location.module').then(m => m.AddLocationModule)
  },
  {
    path: 'editLocation', loadChildren: () => import('./add-location/add-location.module').then(m => m.AddLocationModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule { }
