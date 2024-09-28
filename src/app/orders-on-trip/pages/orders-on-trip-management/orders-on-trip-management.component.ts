import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {OrderOnTripEntity} from "../../model/order-on-trip.entity";
import {OrderOnTripService} from "../../service/order-on-trip.service";
import {OrderOnTripCardComponent} from "../../order-on-trip-card/order-on-trip-card.component";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader, MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {DatePipe, NgForOf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton, MatIconButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {
  OrdersOnTripDialogComponent
} from "../../components/Dialog/orders-on-trip-dialog/orders-on-trip-dialog.component";

@Component({
  selector: 'app-orders-on-trip-management',
  standalone: true,
  imports: [
    OrderOnTripCardComponent,
    MatCard,
    NgForOf,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatIcon,
    MatIconButton,
    MatCardTitle,
    MatCardSubtitle,
    MatCardImage,
    DatePipe,
    MatFabButton
  ],
  templateUrl: './orders-on-trip-management.component.html',
  styleUrl: './orders-on-trip-management.component.css'
})
export class OrdersOnTripManagementComponent implements OnInit {
  //#region Attributes
  protected OrderOnTripData!: OrderOnTripEntity;
  protected ordersOnTripList: Array<OrderOnTripEntity> = [];
  protected editMode: boolean = false;

  private OrderOnTripService: OrderOnTripService = inject(OrderOnTripService);
  private dialog: MatDialog = inject(MatDialog);
  //#endregion

  //#region Methods

  constructor() {
    this.editMode = false;
    this.OrderOnTripData = new OrderOnTripEntity({});
  }

  openOrderDialog(orderOnTrip?: OrderOnTripEntity, editMode: boolean = false): void {
    const dialogRef = this.dialog.open(OrdersOnTripDialogComponent, {
      width: '500px',
      data: { orderOnTrip: orderOnTrip || new OrderOnTripEntity({}), editMode: editMode }
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result?.action) {
        if (result.action === 'add') {
          this.onOrderOnTripAddRequested(result.order);
        } else if (result.action === 'update') {
          this.onOrderOnTripUpdateRequested(result.order);
        }
      }
    });
  }

  protected onEditItem(item: OrderOnTripEntity) {
    this.openOrderDialog(item, true);
  }

  protected onDeleteItem(item: OrderOnTripEntity) {
    this.deleteOrderOnTrip(item.id);
  }

  protected onCancelRequested() {
    this.resetEditState();
    this.getAllOrderOnTrip();
  }

  protected onOrderOnTripAddRequested(item: OrderOnTripEntity) {
    this.OrderOnTripData = item;
    this.createOrderOnTrip();
    this.resetEditState();
  }

  protected onOrderOnTripUpdateRequested(item: OrderOnTripEntity) {
    this.OrderOnTripData = item;
    this.updateOrderOnTrip();
    this.resetEditState();
  }

  private resetEditState() {
    this.OrderOnTripData = new OrderOnTripEntity({});
    this.editMode = false;
  }

  private getAllOrderOnTrip() {
    this.OrderOnTripService.getAll().subscribe((response: Array<OrderOnTripEntity>) => {
      this.ordersOnTripList = response;
    });
  }

  private createOrderOnTrip() {
    const newOrder = {
      clientName: this.OrderOnTripData.clientName,
      productName: this.OrderOnTripData.productName,
      quantity: this.OrderOnTripData.quantity,
      status: this.OrderOnTripData.status,
      dispatchTime: this.OrderOnTripData.dispatchTime,
      estimatedDeliveryTime: this.OrderOnTripData.estimatedDeliveryTime,
      currentLocation: this.OrderOnTripData.currentLocation,
      originAddress: this.OrderOnTripData.originAddress,
      destinationAddress: this.OrderOnTripData.destinationAddress,
      driverName: this.OrderOnTripData.driverName,
      vehicleId: this.OrderOnTripData.vehicleId,
      imageUrl: this.OrderOnTripData.imageUrl,
    };

    this.OrderOnTripService.create(newOrder).subscribe((response: OrderOnTripEntity) => {
      this.ordersOnTripList.push(response);
    });
  }

  private updateOrderOnTrip() {
    const orderToUpdate = this.OrderOnTripData;
    this.OrderOnTripService.update(orderToUpdate.id, orderToUpdate).subscribe((response: OrderOnTripEntity) => {
      const index = this.ordersOnTripList.findIndex(order => order.id === orderToUpdate.id);
      if (index > -1) {
        this.ordersOnTripList[index] = response;
      }
    });
  }

  private deleteOrderOnTrip(id: number) {
    this.OrderOnTripService.delete(id).subscribe(() => {
      this.ordersOnTripList = this.ordersOnTripList.filter(order => order.id !== id);
    });
  }

  ngOnInit(): void {
    this.getAllOrderOnTrip();
  }
  //#endregion
}
