export class OrderOnTripEntity {

  id: number;
  clientName: string;
  productName: string;
  quantity: number;
  status: string;
  dispatchTime: Date;
  estimatedDeliveryTime: Date;
  currentLocation: string;
  originAddress: string;
  destinationAddress: string;
  driverName: string;
  vehicleId: string;
  imageUrl: string;

  constructor(order: {
    id?: number,
    clientName?: string,
    productName?: string,
    quantity?: number,
    status?: string,
    dispatchTime?: Date,
    estimatedDeliveryTime?: Date,
    currentLocation?: string,
    originAddress?: string,
    destinationAddress?: string,
    driverName?: string,
    vehicleId?: string,
    imageUrl?: string
  }) {
    this.id = order.id || 0;
    this.clientName = order.clientName || '';
    this.productName = order.productName || '';
    this.quantity = order.quantity || 0;
    this.status = order.status || '';
    this.dispatchTime = order.dispatchTime || new Date();
    this.estimatedDeliveryTime = order.estimatedDeliveryTime || new Date();
    this.currentLocation = order.currentLocation || '';
    this.originAddress = order.originAddress || '';
    this.destinationAddress = order.destinationAddress || '';
    this.driverName = order.driverName || '';
    this.vehicleId = order.vehicleId || '';
    this.imageUrl = order.imageUrl || '';
  }
}
