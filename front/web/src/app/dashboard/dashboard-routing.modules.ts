import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CallbackPageComponent } from "../callbackPage/callback.component";
import { AddAreaComponent } from "../add-area/add-area.component";
import { HomePageComponent } from "../home-page/home-page.component";
import { AREAPageComponent } from "../a-rea-page/a-rea-page.component";
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
        component: AREAPageComponent,
      },
      {
        path: "add-a-rea",
        component: AddAreaComponent,
      },
      {
        path: "callback",
        component: CallbackPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardModuleRouting {}
