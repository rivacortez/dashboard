import { Routes } from '@angular/router';
import {HomeComponent} from "./public/pages/home/home.component";
import {PageNotFoundComponent} from "./public/pages/page-not-found/page-not-found.component";
import {DriverManagementComponent} from "./drivers/pages/driver-management/driver-management.component";
import {
  OrdersOnTripManagementComponent
} from "./orders-on-trip/pages/orders-on-trip-management/orders-on-trip-management.component";
import {ListTripComponent} from "./trip/components/list-trip/list-trip.component";
import {TripTrackingComponent} from "./trip/components/trip-tracking/trip-tracking.component";
import {VehiclesManagementComponent} from "./vehicles/pages/vehicles-management/vehicles-management.component";
import {MerchandiseItemComponent} from "./merchandise/components/merchandise-item/merchandise-item.component";
import {StatisticsComponent} from "./company/components/statistics/statistics.component";



export const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'pages', component: PageNotFoundComponent },
  {path:'drivers/management', component:DriverManagementComponent},
  {path: 'vehicles/management',component:VehiclesManagementComponent},
  {path: 'ordersOnTrip',component:OrdersOnTripManagementComponent},
    { path: 'list-trip',component: ListTripComponent },
  { path: 'trip-track',component: TripTrackingComponent },
  { path: 'added-merchandise', component: MerchandiseItemComponent},
  { path: 'stadistics', component: StatisticsComponent}

];
