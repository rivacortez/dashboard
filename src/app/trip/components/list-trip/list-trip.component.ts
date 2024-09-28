import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from "@angular/material/table";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {AddTripComponent} from "../add-trip/add-trip.component";
import {MatIcon} from "@angular/material/icon";
import {NgClass} from "@angular/common";
import {TripEntity} from "../../model/trip.entity";
import {TripService} from "../../service/trip.service";

@Component({
  selector: 'app-list-trip',
  standalone: true,
  imports: [
    AddTripComponent,
    MatTable,
    MatHeaderCell,
    MatColumnDef,
    MatSortHeader,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatIcon,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    NgClass,
    MatRowDef,
    MatPaginator
  ],
  templateUrl: './list-trip.component.html',
  styleUrl: './list-trip.component.css'
})
export class ListTripComponent implements OnInit, AfterViewInit {

  //#region Attributes

  protected tripData!: TripEntity;
  protected columnsToDisplay: string[] = ['id', 'name', 'type', 'weight',
    'unload_location','unload_date','expense_id','alert_id','ongoing_trip_id',
    'vehicle_id','driver_id','entrepreneur_id','dimensionx',
    'dimensiony','dimensionz', 'actions'];
  @ViewChild(MatPaginator, {static: false})
  protected paginator!: MatPaginator;
  @ViewChild(MatSort)
  protected sort!: MatSort;
  protected editMode: boolean = false;
  protected dataSource!: MatTableDataSource<any>;
  private tripService: TripService = inject(TripService);

  //#endregion

  //#region Methods

  constructor() {
    this.editMode = false;
    this.tripData = new TripEntity({});
    this.dataSource = new MatTableDataSource();
    console.log(this.tripData);
  }

  protected onEditItem(item: TripEntity) {
    this.editMode = true;
    this.tripData = item;
  }

  protected onDeleteItem(item: TripEntity) {
    this.deleteTrip(item.id);
  }
  protected onCancelRequested() {
    this.resetEditState();
    this.getAllTrips();
  }

  protected onTripAddRequested(item: TripEntity) {
    this.tripData = item;
    this.createTrip();
    this.resetEditState();
  }

  protected onTripUpdateRequested(item: TripEntity) {
    this.tripData = item;
    this.updateTrip();
    this.resetEditState();
  }

  private resetEditState() {
    this.tripData = new TripEntity({});
    this.editMode = false;
  }

  private getAllTrips() {
    this.tripService.getAll().subscribe((response: Array<TripEntity>) => {
      this.dataSource.data = response;
      console.log(response);
    });
  }

  private createTrip() {
    this.tripService.create(this.tripData).subscribe((response: TripEntity) => {
      this.dataSource.data.push(response);
      this.dataSource.data = this.dataSource.data;
    });
  }

  private updateTrip() {
    let tripToUpdate = this.tripData;
    this.tripService.update(tripToUpdate.id, tripToUpdate).subscribe((response: TripEntity) => {
      let index = this.dataSource.data.findIndex((trip: TripEntity) => trip.id === response.id);
      this.dataSource.data[index] = response;
      this.dataSource.data = this.dataSource.data;
    });
  }

  private deleteTrip(id: number) {
    this.tripService.delete(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((trip: TripEntity) => trip.id !== id);
    });
  }

  //#endregion

  //#region Lifecycle Hooks

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllTrips();
  }
}
