import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicationsResolver } from '../services/medications.resolver';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('../medications/medications.module').then(m => m.MedicationsModule),
    
   resolve: {
       medications: MedicationsResolver
   }
 },

 //{ path: 'editLocation', loadChildren: () => import('../locations/edit-location/edit-location.module').then(m => m.EditLocationModule) },
                      
 //{ path: 'details/:id', loadChildren: () => import('../locations/single-location/single-location.module').then(m => m.SingleLocationModule) },
    
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicationsRoutingModule { }
