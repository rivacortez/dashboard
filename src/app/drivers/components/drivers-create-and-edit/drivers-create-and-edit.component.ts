import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {DriverEntity} from "../../model/driver.entity";
import {FormsModule, NgForm} from "@angular/forms";
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-drivers-create-and-edit',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCard,
    FormsModule,
    MatCardContent,
    MatFormField,
    MatInput,
    MatCardActions,
    MatButton,
    NgIf,
    MatCardTitle,
    MatLabel,
    MatError,
    MatIconModule

  ],
  templateUrl: './drivers-create-and-edit.component.html',
  styleUrl: './drivers-create-and-edit.component.css'
})
export class DriversCreateAndEditComponent {
// Attributes
  @Input() driver!: DriverEntity;
  @Input() editMode: boolean = false;
  @Output() driverAddRequested = new EventEmitter<DriverEntity>();
  @Output() driverUpdateRequested = new EventEmitter<DriverEntity>();
  @Output() cancelRequested = new EventEmitter();
  @ViewChild('driverForm', { static: false }) driverForm!: NgForm;

  // Methods
  constructor() {
    this.driver = new DriverEntity({});
  }

  // Private methods
  private resetEditState() {
    this.driver = new DriverEntity({});
    this.editMode = false;
    this.driverForm.resetForm();
  }

  // Event Handlers
  onSubmit() {
    if (this.driverForm.form.valid) {
      let emitter = this.editMode ? this.driverUpdateRequested : this.driverAddRequested;
      emitter.emit(this.driver);
      this.resetEditState();
    } else {
      console.error('Invalid form data');
    }
  }

  onCancel() {
    this.cancelRequested.emit();
    this.resetEditState();
  }



}
