import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AreaPageComponent } from "../a-rea-page/a-rea-page.component";
import { HomePageComponent } from "../home-page/home-page.component";
import { DashboardPage } from "./dashboard.page";

const routes: Routes = [
  {
    path: "",
    component: DashboardPage,
    children: [
      {
        path: "",
        component: HomePageComponent,
      },
      {
        path: "a-rea",
        component: AreaPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardModuleRouting {}
