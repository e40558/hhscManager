import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ResetPassswordComponent } from './components/reset-passsword/reset-passsword.component';

const routes: Routes = [
  {path: 'login' , component: LoginComponent},
  {path: 'register' , component: SignupComponent},
  {path: 'reset-password' , component: ResetPassswordComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
