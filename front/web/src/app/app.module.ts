import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginPageComponent } from "./loginPage/loginPage.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { FormComponent } from './loginPage/form/form.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { HeaderComponent } from './header/header.component';
import { LoginServicsePopupComponent } from './header/login-servicse-popup/login-servicse-popup.component';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [AppComponent, LoginPageComponent, FormComponent, HomePageComponent, HeaderComponent, LoginServicsePopupComponent],
  imports: [BrowserModule, AppRoutingModule, CommonModule, BrowserAnimationsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
