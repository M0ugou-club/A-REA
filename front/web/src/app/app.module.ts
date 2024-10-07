import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginPageComponent } from "./loginPage/loginPage.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FormComponent } from "./loginPage/form/form.component";
import { ImageModule } from "primeng/image";
import { FloatLabelModule } from "primeng/floatlabel";
import { HeaderComponent } from "./header/header.component";
import { LoginServicsePopupComponent } from "./header/login-servicse-popup/login-servicse-popup.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { AREAPageComponent } from "./a-rea-page/a-rea-page.component";
import { AddAreaComponent } from "./add-area/add-area.component";
import { AReaComponent } from "./a-rea-page/a-rea/a-rea.component";
import { ChoiceButtonComponent } from "./add-area/choice-button/choice-button.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    FormComponent,
    HomePageComponent,
    HeaderComponent,
    LoginServicsePopupComponent,
    AREAPageComponent,
    AddAreaComponent,
    AReaComponent,
    ChoiceButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
