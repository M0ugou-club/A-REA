import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { AREAPageComponent } from "./a-rea-page.component";
import { AddAreaComponent } from "./add-area/add-area.component";
import { AReaComponent } from "./a-rea/a-rea.component";

@NgModule({
  declarations: [AREAPageComponent, AReaComponent, AddAreaComponent],
  imports: [BrowserModule, CommonModule, BrowserAnimationsModule, FormsModule],
  providers: [],
  bootstrap: [AREAPageComponent],
})
export class AREAModule {}
