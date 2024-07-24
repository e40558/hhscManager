import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedsheetsComponent } from './medsheets.component';

describe('MedsheetsComponent', () => {
  let component: MedsheetsComponent;
  let fixture: ComponentFixture<MedsheetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedsheetsComponent]
    });
    fixture = TestBed.createComponent(MedsheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
