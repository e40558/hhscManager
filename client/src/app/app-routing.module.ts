import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LessonsComponent } from './lessons/lessons.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/service/auth.guard';
import { roleGuard } from './auth/service/role.guard';

const routes: Routes = [

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
