import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationsComponent } from './medications.component';

describe('MedicationsComponent', () => {
  let component: MedicationsComponent;
  let fixture: ComponentFixture<MedicationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicationsComponent]
    });
    fixture = TestBed.createComponent(MedicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
