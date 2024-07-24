import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedSheetItemComponent } from './med-sheet-item.component';

describe('MedSheetItemComponent', () => {
  let component: MedSheetItemComponent;
  let fixture: ComponentFixture<MedSheetItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedSheetItemComponent]
    });
    fixture = TestBed.createComponent(MedSheetItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
