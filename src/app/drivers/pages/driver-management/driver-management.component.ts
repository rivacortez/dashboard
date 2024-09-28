import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {DriverEntity} from "../../model/driver.entity";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {DriverService} from "../../services/driver.service";
import {
  DriversCreateAndEditComponent
} from "../../components/drivers-create-and-edit/drivers-create-and-edit.component";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {NgClass} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatCard, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-driver-management',
  standalone: true,
  imports: [
    DriversCreateAndEditComponent,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCell,
    MatSortHeader,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatIcon,
    MatHeaderRow,
    NgClass,
    MatRowDef,
    MatHeaderRowDef,
    MatRow,
    MatPaginator,
    MatIconModule,
    MatIconButton,
    MatFormField,
    FormsModule,
    MatInput,
    MatButton,
    MatLabel,
    MatCardTitle,
    MatCard
  ],
  templateUrl: './driver-management.component.html',
  styleUrl: './driver-management.component.css'
})
export class DriverManagementComponent implements OnInit, AfterViewInit {

  //#region Attributes

  protected driverData!: DriverEntity;
  protected columnsToDisplay: string[] = ['id', 'name', 'dni', 'phone','license', 'actions'];
  @ViewChild(MatPaginator, {static: false})
  protected paginator!: MatPaginator;
  @ViewChild(MatSort)
  protected sort!: MatSort;
  protected editMode: boolean = false;
  protected dataSource!: MatTableDataSource<any>;
  private driverService: DriverService = inject(DriverService);

  //#endregion

  //#region Methods

  constructor() {
    this.editMode = false;
    this.driverData = new DriverEntity({});
    this.dataSource = new MatTableDataSource();
    console.log(this.driverData);
  }
  onSubmit(): void {
    if (this.editMode) {

      this.onDriverUpdateRequested(this.driverData!);
    } else {

      const newDriver: DriverEntity = {
        id: this.dataSource.data.length + 1,
        name: this.driverData?.name || '',
        dni: this.driverData?.dni || '',
        phone: this.driverData?.phone || '',
        license: this.driverData?.license || ''
      };
      this.onDriverAddRequested(newDriver);
    }
  }

  protected onEditItem(item: DriverEntity) {
    this.editMode = true;
    this.driverData = item;
  }

  protected onDeleteItem(item: DriverEntity) {
    this.deleteDriver(item.id);
  }

  protected onCancelRequested() {
    this.resetEditState();
    this.getAllDrivers();
  }

  protected onDriverAddRequested(item: DriverEntity) {
    this.driverData = item;
    this.createDriver();
    this.resetEditState();
  }

  protected onDriverUpdateRequested(item: DriverEntity) {
    this.driverData = item;
    this.updateDriver();
    this.resetEditState();
  }

  private resetEditState() {
    this.driverData = new DriverEntity({});
    this.editMode = false;
  }

  private getAllDrivers() {
    this.driverService.getAll().subscribe((response: Array<DriverEntity>) => {
      this.dataSource.data = response;
    });
  }

  private createDriver() {
    this.driverService.create(this.driverData).subscribe((response: DriverEntity) => {
      this.dataSource.data.push(response);
      this.dataSource.data = this.dataSource.data;
    });
  }

  private updateDriver() {
    let driverToUpdate = this.driverData;
    this.driverService.update(driverToUpdate.id, driverToUpdate).subscribe((response: DriverEntity) => {
      let index = this.dataSource.data.findIndex((driver: DriverEntity) => driver.id === response.id);
      this.dataSource.data[index] = response;
      this.dataSource.data = this.dataSource.data;
    });
  }

  private deleteDriver(id: number) {
    this.driverService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((driver: DriverEntity) => driver.id !== id);
    });
  }

  //#endregion

  //#region Lifecycle Hooks

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllDrivers();
  }

  //#endregion
}
