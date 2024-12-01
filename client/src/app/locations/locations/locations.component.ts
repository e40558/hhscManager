import { Component } from '@angular/core';
import { Location } from '../model/location.model';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectBeginnerCourses, selectAdvancedCourses, selectPromoTotal } from 'src/app/courses/courses.selectors';
import { AppState } from 'src/app/reducers';
import { selectAllLocations } from '../state/locations.selectors';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationsComponent {
  allLocations$: Observable<Location[]> = new Observable<Location[]>() ;


  
  constructor(
  
    private store: Store<AppState>) {

  }
  ngOnInit() {
    this.reload();
  }

reload() {

      this.allLocations$ = this.store.pipe(select(selectAllLocations));

}

  onAddLocation(){}

}
