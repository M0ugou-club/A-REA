import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginPageComponent } from "./loginPage/loginPage.component";
import { RegisterPageComponent } from "./registerPage/registerPage.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ImageModule } from "primeng/image";
import { FloatLabelModule } from "primeng/floatlabel";
import { HeaderComponent } from "./header/header.component";
import { LoginServicsePopupComponent } from "./header/login-servicse-popup/login-servicse-popup.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { AreaPageComponent } from "./a-rea-page/a-rea-page.component";
import { ChoiceButtonComponent } from "./a-rea-page/choice-button/choice-button.component";
import { HttpClientModule } from "@angular/common/http";
import {
  LucideAngularModule,
  Ellipsis,
  ChevronDown,
  ChevronUp,
  RefreshCcw,
  GitCommitHorizontal,
  GitFork,
  GitCompareArrows,
  GitCommitVertical,
  CircleHelp,
  Trash2,
} from "lucide-angular";
import { ChoicePreviewComponent } from "./a-rea-page/choice-preview/choice-preview.component";
import { AReasComponent } from "./a-rea-page/a-reas/a-reas.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HomePageComponent,
    AreaPageComponent,
    ChoiceButtonComponent,
    ChoicePreviewComponent,
    AReasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    LucideAngularModule.pick({
      Ellipsis,
      ChevronDown,
      ChevronUp,
      RefreshCcw,
      GitCommitHorizontal,
      GitFork,
      GitCompareArrows,
      GitCommitVertical,
      CircleHelp,
      Trash2,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
