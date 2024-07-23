import { Component, Input } from '@angular/core';

import { Location } from '../model/location.model';

@Component({
  selector: 'locations-card-list',
  templateUrl: './locations-card-list.component.html',
  styleUrls: ['./locations-card-list.component.scss']
})
export class LocationsCardListComponent {

  @Input()
  locations: Location[] =[];

}
