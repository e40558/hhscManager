import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumersListComponent } from './consumers-list.component';

describe('ConsumersListComponent', () => {
  let component: ConsumersListComponent;
  let fixture: ComponentFixture<ConsumersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumersListComponent]
    });
    fixture = TestBed.createComponent(ConsumersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
