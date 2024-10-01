import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginPageComponent } from "./loginPage/loginPage.component";
import { AREAPageComponent } from "./a-rea-page/a-rea-page.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginPageComponent,
  },
  {
    path: "a-rea",
    component: AREAPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
