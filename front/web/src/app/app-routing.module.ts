import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginPageComponent } from "./loginPage/loginPage.component";
import { HeaderComponent } from "./header/header.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { CallbackPageComponent } from "./callbackPage/callback.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomePageComponent,
  },
  {
    path: "login",
    component: LoginPageComponent,
  },
  {
    path: "header",
    component: HeaderComponent,
  },
  {
    path: "callback",
    component: CallbackPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
