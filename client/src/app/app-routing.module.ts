import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { LessonsComponent } from './lessons/lessons.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/service/auth.guard';
import { roleGuard } from './auth/service/role.guard';
import { TrackerComponent } from './tracker/tracker.component';

const routes: Routes = [
  {
    path: '',
    component: TrackerComponent
  },

  {
    path: 'locations',
    loadChildren: () => import('./locations/locations.module').then(m => m.LocationsModule),
    
 },

 {
  path: 'medsheets',
  loadChildren: () => import('./medsheets/medsheets.module').then(m => m.MedsheetsModule),
  
},
{
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
    canActivate: [AuthGuard]
 },
 {
  path: 'reslogs',
  loadChildren: () => import('./res-log/res-log.module').then(m => m.ResLogModule),
  canActivate: [AuthGuard]
},

{
    path: "about",
    component: AboutComponent
},
{
  path:"lessons",
  component: LessonsComponent,
  canActivate: [AuthGuard],
  data: {
    role: 'STUDENT'
  }

},
{
  path: 'admin',
  component: AdminComponent,
  canActivate: [roleGuard],
  data: {
    roles: ['ADMIN']
  }
},

  { path: 'singleLocation', loadChildren: () => import('./locations/single-location/single-location.module').then(m => m.SingleLocationModule) },


{
    path: "**",
    redirectTo: '/'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
