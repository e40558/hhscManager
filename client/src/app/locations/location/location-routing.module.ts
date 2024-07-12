import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationComponent } from './location.component';

const routes: Routes = [{ path: '', component: LocationComponent }, 
                        { path: 'addLocation/:id', loadChildren: () => import('../add-location/add-location.module').then(m => m.AddLocationModule) },
                        { path: 'editLocation/:id', loadChildren: () => import('../edit-location/edit-location.module').then(m => m.EditLocationModule) },
                        { path: 'locationsTableList', loadChildren: () => import('../locations-table-list/locations-table-list.module').then(m => m.LocationsTableListModule) },
                        
                      ];
                        
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})                            
export class LocationRoutingModule { }


 