import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsTableListComponent } from './locations-table-list.component';

describe('LocationsTableListComponent', () => {
  let component: LocationsTableListComponent;
  let fixture: ComponentFixture<LocationsTableListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationsTableListComponent]
    });
    fixture = TestBed.createComponent(LocationsTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
