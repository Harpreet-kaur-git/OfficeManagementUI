import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEmployeeLocation } from './manage-employee-location';

describe('ManageEmployeeLocation', () => {
  let component: ManageEmployeeLocation;
  let fixture: ComponentFixture<ManageEmployeeLocation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageEmployeeLocation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEmployeeLocation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
