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
    this.showLoginPopup = !this.showLoginPopup;
  }

  goToAreas() {
    console.log("cacadou");
    this.router.navigate(["dashboard/a-rea"]);
  }

  goToDashboard = () => {
    this.router.navigate(["dashboard/"]);
  }
}
