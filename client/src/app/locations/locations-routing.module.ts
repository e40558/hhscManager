import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsResolver } from './services/locations.resolver';
import { SingleLocationComponent } from './detail/single-location.component';
import { ConsumerDetailComponent } from '../consumers/consumer-details/consumer-detail/consumer-detail.component';
import { ConsumersComponent } from '../consumers/consumers.component';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./locations/locations.module').then(m => m.LocationsModule),
         resolve: {
        locations: LocationsResolver
    }
  },

  {
    path:":id",
    component: SingleLocationComponent,
   // canActivate: [AuthGuard],
   // canActivateChild: [AuthGuard],
   // canDeactivate: [ConfirmExitGuard],
    children: [
        {
          path: "",
          component: ConsumersComponent,
          resolve: {
             // consumers: ConsumersResolver
          }
        },
        {
            path: "consumers/:id",
            component: ConsumerDetailComponent,
            resolve: {
             //   lesson: LessonDetailResolver
            }
        }
    ],
    resolve: {
       // course: CourseResolver
    }
},

  { path: 'editLocation/:id', loadChildren: () => import('../locations/edit-location/edit-location.module').then(m => m.EditLocationModule) },
                       
  
  
  

];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule { }
