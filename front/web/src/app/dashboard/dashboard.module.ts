import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardPage } from "./dashboard.page";
import { DashboardModuleRouting } from "./dashboard-routing.modules";
import { HeaderComponent } from "../header/header.component";
import { LoginServicsePopupComponent } from "../header/login-servicse-popup/login-servicse-popup.component";
import { LoginServiceComponent } from "../header/login-servicse-popup/login-service/login-service.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    LoginServicsePopupComponent,
    HeaderComponent,
    DashboardPage,
    LoginServiceComponent,
  ],
  imports: [CommonModule, DashboardModuleRouting, FormsModule],
  bootstrap: [DashboardPage],
})
export class DashboardModule {}
