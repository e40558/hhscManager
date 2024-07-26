import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedsheetComponent } from './medsheets.component';


describe('MedsheetsComponent', () => {
  let component: MedsheetComponent;
  let fixture: ComponentFixture<MedsheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedsheetComponent]
    });
    fixture = TestBed.createComponent(MedsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
