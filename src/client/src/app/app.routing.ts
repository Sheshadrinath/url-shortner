import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";

export const RouteData: Routes = [
  {
    path: '', //Dont Put slash. Angular will put slash else throws error
    component: HomeComponent
  }
]
