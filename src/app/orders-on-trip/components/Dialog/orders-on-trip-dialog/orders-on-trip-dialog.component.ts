import {Component, Inject} from '@angular/core';
import {OrderOnTripEntity} from "../../../model/order-on-trip.entity";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormsModule, NgForm} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatError, MatFormField, MatInput, MatInputModule, MatLabel, MatSuffix} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle,

} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";

@Component({
  selector: 'app-orders-on-trip-dialog',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    MatDialogActions,
    MatButton,
    MatInput,
    MatError,
    MatLabel,
    MatFormField,
    MatIcon,
    MatDialogTitle,
    MatIconButton,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatNativeDateModule,
    MatDialogContent,
    MatSuffix,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,


  ],
  templateUrl: './orders-on-trip-dialog.component.html',
  styleUrl: './orders-on-trip-dialog.component.css'
})
export class OrdersOnTripDialogComponent {
  orderOnTrip: OrderOnTripEntity;
  editMode: boolean;
  formTouched: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<OrdersOnTripDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { orderOnTrip: OrderOnTripEntity, editMode: boolean }
  ) {
    this.orderOnTrip = new OrderOnTripEntity(data.orderOnTrip);
    this.editMode = data.editMode;
  }

  onSubmit(form: NgForm) {
    this.formTouched = Object.values(form.controls).some(control => control.touched);
    if (form.valid) {
      this.dialogRef.close({ order: this.orderOnTrip, action: this.editMode ? 'update' : 'add' });
    }
  }

  onCancel(): void {
    this.dialogRef.close({ action: 'cancel' });
  }

  isFormTouchedAndInvalid(form: NgForm): boolean {
    return <boolean>form.invalid && this.formTouched;
  }
}
