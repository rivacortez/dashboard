export class TripEntity {
  id: number;
  name: string;
  type: string;
  weight: number;
  unload_location: string;
  unload_date: string;
  expense_id: number;
  alert_id: number;
  ongoing_trip_id: number;
  vehicle_id: number;
  driver_id: number;
  entrepreneur_id: number;
  dimensionx: number;
  dimensiony: number;
  dimensionz: number;

  constructor(trip: {id?: number, name?: string, type?: string,
    weight?: number, unload_location?: string,unload_date?: string,
    expense_id?: number,alert_id?: number,ongoing_trip_id?: number,
    vehicle_id?: number,driver_id?: number,entrepreneur_id?: number,
    dimensionx?:number,dimensiony?:number,dimensionz?:number}) {
    this.id = trip.id || 0;
    this.name = trip.name || '';
    this.type = trip.type || '';
    this.weight = trip.weight || 0;
    this.unload_location = trip.unload_location || '';
    this.unload_date = trip.unload_date || '';
    this.expense_id = trip.expense_id || 0;
    this.alert_id = trip.alert_id || 0;
    this.ongoing_trip_id = trip.ongoing_trip_id || 0;
    this.vehicle_id = trip.vehicle_id || 0;
    this.driver_id = trip.driver_id || 0;
    this.entrepreneur_id = trip.entrepreneur_id || 0;
    this.dimensionx = trip.dimensionx || 0;
    this.dimensiony = trip.dimensiony || 0;
    this.dimensionz = trip.dimensionz || 0;

  }
}
