import { Component } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  pageTitle: string = "";
  showLoginPopup = false;

  constructor(private router: Router, private titleService: Title) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updatePageTitle();
      });
  }

  private updatePageTitle(): void {
    const urlSegments = this.router.url.split('/');
    this.pageTitle = urlSegments[urlSegments.length - 1];
    if (this.pageTitle === "dashboard") {
      this.pageTitle = "";
    }
  }

  handleUserIconButton(): void {
    this.showLoginPopup = !this.showLoginPopup;
  }

  goToAreas() {
    this.router.navigate(["dashboard/a-rea"]);
  }

  goToDashboard = () => {
    this.router.navigate(["dashboard/"]);
  };
}