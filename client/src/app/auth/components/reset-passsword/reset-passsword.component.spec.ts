import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPassswordComponent } from './reset-passsword.component';

describe('ResetPassswordComponent', () => {
  let component: ResetPassswordComponent;
  let fixture: ComponentFixture<ResetPassswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPassswordComponent]
    });
    fixture = TestBed.createComponent(ResetPassswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
