import { Component, Input } from '@angular/core';
import { Location } from '../model/location.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Router } from '@angular/router';
import { locationDeletedSuccess } from '../state/locations.actions';

@Component({
  selector: 'locations-table-list',
  templateUrl: './locations-table-list.component.html',
  styleUrls: ['./locations-table-list.component.scss']
})
export class LocationsTableListComponent {
  @Input()
  locations: Location[] =[];


  constructor(private store: Store<AppState>, private router: Router) {}


  onDeleteLocation(id: number) {
    if (confirm('Are you sure you want to delete')) {
      this.store.dispatch(locationDeletedSuccess({ id }));
    }
  }

  onUpdateLocation(location: Location) : void{

    this.router.navigate(['locations/editLocation'], {
      state: {
        response: location
      },
    });

  }

}
