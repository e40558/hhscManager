import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsComponent } from './locations.component';

const routes: Routes = [
  
  { path: '', component: LocationsComponent },
  {
    path: 'addLocation',
    loadChildren: () =>
      import('../add-location/add-location.module').then(
        (m) => m.AddLocationModule
      ),
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationRoutingModule {}
