import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationsTableListComponent } from './locations-table-list.component';

const routes: Routes = [{ path: '', component: LocationsTableListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsTableListRoutingModule { }
