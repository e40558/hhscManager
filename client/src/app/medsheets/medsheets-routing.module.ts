import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedsheetComponent } from './medsheets/medsheets.component';

const routes: Routes = [
  {path:"" ,component: MedsheetComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedsheetsRoutingModule { }
