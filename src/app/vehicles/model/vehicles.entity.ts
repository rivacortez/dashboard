export class VehiclesEntity {

  id: number;
  model: string;
  plate: string;
  max_load: string;
  volume: string;
  url_image: string;

  constructor(vehicle: {id?: number, model?: string, plate?: string, max_load?: string, volume?: string, url_image?: string}) {
    this.id = vehicle.id || 0;
    this.model = vehicle.model || '';
    this.plate = vehicle.plate || '';
    this.max_load = vehicle.max_load || '';
    this.volume = vehicle.volume || '';
    this.url_image = vehicle.url_image || '';
  }
}


