import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsCardListComponent } from './locations-card-list.component';

const routes: Routes = [{ path: '', component: LocationsCardListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsCardListRoutingModule { }
