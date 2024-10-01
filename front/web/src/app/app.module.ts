import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginPageComponent } from "./loginPage/loginPage.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { FormComponent } from './loginPage/form/form.component';
import {ImageModule} from "primeng/image";
import { FloatLabelModule } from 'primeng/floatlabel';
import { AREAPageComponent } from './a-rea-page/a-rea-page.component';


@NgModule({
  declarations: [AppComponent, LoginPageComponent, FormComponent, AREAPageComponent],
  imports: [BrowserModule, AppRoutingModule, CommonModule, BrowserAnimationsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
