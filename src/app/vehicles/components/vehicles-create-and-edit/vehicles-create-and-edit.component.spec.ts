import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesCreateAndEditComponent } from './vehicles-create-and-edit.component';

describe('VehiclesCreateAndEditComponent', () => {
  let component: VehiclesCreateAndEditComponent;
  let fixture: ComponentFixture<VehiclesCreateAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiclesCreateAndEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclesCreateAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
