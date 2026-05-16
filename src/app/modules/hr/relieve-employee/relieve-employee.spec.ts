import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelieveEmployee } from './relieve-employee';

describe('RelieveEmployee', () => {
  let component: RelieveEmployee;
  let fixture: ComponentFixture<RelieveEmployee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelieveEmployee]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelieveEmployee);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
