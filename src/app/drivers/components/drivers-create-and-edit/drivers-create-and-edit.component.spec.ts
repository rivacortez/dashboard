import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversCreateAndEditComponent } from './drivers-create-and-edit.component';

describe('DriversCreateAndEditComponent', () => {
  let component: DriversCreateAndEditComponent;
  let fixture: ComponentFixture<DriversCreateAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriversCreateAndEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversCreateAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
