import { Component } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { filter } from "rxjs/operators";
import { environment } from "../../../environment/environment";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  pageTitle: string = "";
  showLoginPopup = false;
  userImage: string = "";

  constructor(private router: Router, private titleService: Title) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updatePageTitle();
      });
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    fetch(`${environment.apiUrl}/users`, {
      method: "GET",
      headers: {
        authorization: "Bearer " + localStorage.getItem("authToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.userImage = data.image;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  private updatePageTitle(): void {
    const urlSegments = this.router.url.split("/");
    this.pageTitle = urlSegments[urlSegments.length - 1].toUpperCase();

    if (this.pageTitle === "DASHBOARD") {
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
