import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsCardListComponent } from './locations-card-list.component';

describe('LocationsCardListComponent', () => {
  let component: LocationsCardListComponent;
  let fixture: ComponentFixture<LocationsCardListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationsCardListComponent]
    });
    fixture = TestBed.createComponent(LocationsCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
