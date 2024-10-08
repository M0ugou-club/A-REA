import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  constructor(private router: Router) {}

  showLoginPopup = false;

  handleUserIconButton(): void {
    console.log("test");
    this.showLoginPopup = !this.showLoginPopup;
  }

  handleHomeButtonClick() {
    this.router.navigate(["/home"]);
  }

  handleAreaButtonClick() {
    this.router.navigate(["/a-rea"]);
  }
}
