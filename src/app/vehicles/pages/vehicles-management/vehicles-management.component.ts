import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {VehiclesEntity} from "../../model/vehicles.entity";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort,MatSortHeader} from "@angular/material/sort";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {VehiclesService} from "../../services/vehicles.service";
import {
  VehiclesCreateAndEditComponent
} from "../../components/vehicles-create-and-edit/vehicles-create-and-edit.component";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {NgClass} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatCard, MatCardTitle} from "@angular/material/card";

@Component({
  selector: 'app-vehicles-management',
  standalone: true,
  imports: [
    VehiclesCreateAndEditComponent,
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
  templateUrl: './vehicles-management.component.html',
  styleUrl: './vehicles-management.component.css'
})
export class VehiclesManagementComponent implements OnInit, AfterViewInit {

  //#region Attributes

  protected vehicleData!: VehiclesEntity;
  protected columnsToDisplay: string[] = ['id', 'model', 'plate', 'max_load', 'volume', 'photo', 'actions']; // Añadida columna 'actions'
  @ViewChild(MatPaginator, { static: false })
  protected paginator!: MatPaginator;
  @ViewChild(MatSort)
  protected sort!: MatSort;
  protected editMode: boolean = false;
  protected dataSource!: MatTableDataSource<any>;
  private vehicleService: VehiclesService = inject(VehiclesService);

  //#endregion

  //#region Methods

  constructor() {
    this.editMode = false;
    this.vehicleData = new VehiclesEntity({});
    this.dataSource = new MatTableDataSource();
  }

  onSubmit(): void {
    if (this.editMode) {

      this.onVehicleUpdateRequested(this.vehicleData!);
    } else {

      const newVehicle: VehiclesEntity = {
        id: this.dataSource.data.length + 1,
        model: this.vehicleData?.model || '',
        plate: this.vehicleData?.plate || '',
        max_load: this.vehicleData?.max_load || '',
        volume: this.vehicleData?.volume || '',
        url_image: this.vehicleData?.url_image || '',
      };
      this.onVehicleAddRequested(newVehicle);
    }
  }

  protected onEditItem(item: VehiclesEntity) {
    this.editMode = true;
    this.vehicleData = item;
  }

  protected onDeleteItem(item: VehiclesEntity) {
    this.deleteVehicle(item.id);
  }

  protected onCancelRequested() {
    this.resetEditState();
    this.getAllVehicles();
  }

  protected onVehicleAddRequested(item: VehiclesEntity) {
    this.createVehicle(item);
    this.resetEditState();
  }

  protected onVehicleUpdateRequested(item: VehiclesEntity) {
    this.updateVehicle(item);
    this.resetEditState();
  }

  private resetEditState() {
    this.vehicleData = new VehiclesEntity({});
    this.editMode = false;
  }

  private getAllVehicles() {
    this.vehicleService.getAll().subscribe((response: Array<VehiclesEntity>) => {
      this.dataSource.data = response;
    });
  }

  private createVehicle(vehicle: VehiclesEntity) {
    this.vehicleService.create(vehicle).subscribe((response: VehiclesEntity) => {
      this.dataSource.data.push(response);
      this.dataSource._updateChangeSubscription();
    });
  }

  private updateVehicle(vehicle: VehiclesEntity) {
    this.vehicleService.update(vehicle.id, vehicle).subscribe((response: VehiclesEntity) => {
      const index = this.dataSource.data.findIndex(v => v.id === response.id);
      if (index !== -1) {
        this.dataSource.data[index] = response;
        this.dataSource._updateChangeSubscription();
      }
    });
  }

  private deleteVehicle(id: number) {
    this.vehicleService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(vehicle => vehicle.id !== id);
      this.dataSource._updateChangeSubscription();
    });
  }

  //#endregion

  //#region Lifecycle Hooks

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllVehicles();
  }

  //#endregion
}
