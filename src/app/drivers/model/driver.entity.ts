export class DriverEntity {


  id: number;
  name:string;
  dni: string;
  phone: string;
  license: string;
  constructor(driver:{id?: number, name?: string, dni?: string, phone?: string, license?: string}) {
    this.id = driver.id || 0;
    this.name =  driver.name || '';
    this.dni = driver.name || '';
    this.phone = driver.name || '';
    this.license = driver.name || '';
  }


}
