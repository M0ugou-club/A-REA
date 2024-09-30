import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginPageComponent } from "./loginPage/loginPage.component";
import { HeaderComponent } from "./header/header.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginPageComponent,
  },
  {
    path: "header",
    component: HeaderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
