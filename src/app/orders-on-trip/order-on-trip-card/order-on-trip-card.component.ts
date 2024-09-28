import {AfterViewInit, Component, EventEmitter, inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {OrderOnTripEntity} from "../model/order-on-trip.entity";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {OrderOnTripService} from "../service/order-on-trip.service";
import {MatButton} from "@angular/material/button";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {FormsModule, NgForm} from "@angular/forms";
import {MatNativeDateModule} from "@angular/material/core";

@Component({
  selector: 'app-order-on-trip-card',
  standalone: true,
  imports: [
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatButton,
    MatPaginator,
    MatRow,
    MatHeaderRow,
    MatTable,
    MatSort,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    NgForOf,
    MatCardHeader,
    MatCard,
    MatCardContent,
    MatCardActions,
    NgIf,
    FormsModule,
    MatCardTitle,
    MatCardSubtitle,
    DatePipe,
    MatNativeDateModule
  ],
  templateUrl: './order-on-trip-card.component.html',
  styleUrl: './order-on-trip-card.component.css'
})
export class OrderOnTripCardComponent {  // Attributes
  @Input() orderOnTrip!: OrderOnTripEntity;
  @Input() editMode: boolean = false;
  @Output() orderOnTripAddRequested = new EventEmitter<OrderOnTripEntity>();
  @Output() orderOnTripUpdateRequested = new EventEmitter<OrderOnTripEntity>();
  @Output() cancelRequested = new EventEmitter();
  @ViewChild('orderOnTripForm', {static: false}) orderOnTripForm!: NgForm;

// Methods
  constructor() {
    this.orderOnTrip = new OrderOnTripEntity({});
  }

// Private methods
  private resetEditState() {
    this.orderOnTrip = new OrderOnTripEntity({});
    this.editMode = false;
    this.orderOnTripForm.resetForm();
  }

// Event Handlers
  onSubmit() {
    if (this.orderOnTripForm.form.valid) {
      let emitter = this.editMode ? this.orderOnTripUpdateRequested : this.orderOnTripAddRequested;
      emitter.emit(this.orderOnTrip);
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
