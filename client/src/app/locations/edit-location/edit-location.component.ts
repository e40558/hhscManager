import { Component } from '@angular/core';
import {  locationUpdatedSucess } from '../state/locations.actions';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup } from '@angular/forms';
import { AppState } from 'src/app/reducers';
import { Update } from '@ngrx/entity';
import { selectLocationById } from '../state/locations.selectors';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '../model/location.model';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.scss']
})
export class EditLocationComponent {
  locationForm: FormGroup;
 
  location: any;


  postForm: FormGroup;
  postSubscription: Subscription;
  constructor(private store: Store<AppState>, private router: Router) {
    this.location = this.router.getCurrentNavigation().extras.state?.['response'];
    if (!this.location) {
      this.router.navigate(['']);
    }
  }






  ngOnInit(): void {

    this.locationForm = new FormGroup({
      name: new FormControl(null, [
    //    Validators.required,
       // Validators.minLength(6),
      ]),
      phoneNum: new FormControl(null, [
     //   Validators.required,
        
      ]),
      iconUrl: new FormControl("", [
        //   Validators.required,
           
         ]),


      
      city: new FormControl(null, [
      //  Validators.required,        
      ]),
      zip: new FormControl(null, [
      //  Validators.required,
        
      ]),

      address: new FormControl(null, [
       // Validators.required,
        
      ]),

      state: new FormControl(null, [
       // Validators.required,
        
      ]),
      
    });

    
        this.locationForm.patchValue({...this.location});
     
  }

  

  onUpdateLocation() {
    if (!this.locationForm.valid) {
      return;
    } 
    
    const location: Location = {
      ...this.location,
      ...this.locationForm.value
    };

    const update: Update<Location> = {
      id: location.id,
      changes: location
    };

    this.store.dispatch(locationUpdatedSucess({update}));
    this.router.navigate(['locations']);

}
}
