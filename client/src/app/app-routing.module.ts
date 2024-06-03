import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LessonsComponent } from './lessons/lessons.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path: "",
    component: LessonsComponent

},
{
  path:"login",
  component: LoginComponent
},
{
    path: "about",
    component: AboutComponent
},
{
  path:"signup",
  component: SignupComponent

},
{
  path:"lessons",
  component: LessonsComponent

},
{
  path: 'admin',
  component: AdminComponent
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
