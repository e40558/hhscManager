import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { Location } from '../model/location.model';
import { addLocation } from '../state/locations.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent {
  locationForm: FormGroup;

  location: Location;

  constructor(private store: Store<AppState>, private router:Router) {}

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
  }

  showDescriptionErrors() {
    const descriptionForm = this.locationForm.get('description');
    if (descriptionForm.touched && !descriptionForm.valid) {
      if (descriptionForm.errors['required']) {
        return 'Description is required';
      }
      
      if (descriptionForm.errors['minlength']) {
        return 'Description should be of minimum 10 characters length';
      }     
    }
return  ""
  }

  onAddPost() {
    if (!this.locationForm.valid) {
      return;
    } 
    
    const location: Location = {
      ...this.location,
      ...this.locationForm.value
    };

    this.store.dispatch(addLocation({ location }));

    this.router.navigate(['locations'])

  }
}
