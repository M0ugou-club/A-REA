import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../../environment/environment";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent implements OnInit {
  constructor(private router: Router) {}
  userName: string = "";
  userEmail: string = "";
  services: string[] = [];
  currentIndex: number = 0;

  areas: {
    areaId: number;
    actionService: string;
    reactionService: string;
    actionText: string;
    reactionText: string;
    title: string;
  }[] = [];

  ngOnInit(): void {
    this.getUserInfo();
    this.getServices();
    this.loadAReas();
    const localData = localStorage.getItem("authToken");

    if (localData != null) {
      fetch(`${environment.apiUrl}/isLogged`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localData,
        },
      })
        .then((response) => {
          if (response.status != 200) {
            this.router.navigate(["/login"]);
          }
        })
        .catch((error) => {
          console.error("Erreur de requête:", error);
        });
    } else {
      this.router.navigate(["/login"]);
    }
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
        this.userName = data.name;
        this.userEmail = data.email;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  getServices() {
    fetch(`${environment.apiUrl}/tokens/state`, {
      method: "GET",
      headers: {
        authorization: "Bearer " + localStorage.getItem("authToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.services = Object.keys(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  loadAReas(): void {
    fetch(`${environment.apiUrl}/areas`, {
      method: "GET",
      headers: {
        authorization: "Bearer " + localStorage.getItem("authToken"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.error(response);
        }
        return response.json();
      })
      .then((data) => {
        data.forEach((area: any) => {
          this.areas.push({
            areaId: area._id,
            actionService: area.action.platform,
            reactionService: area.reactions.platform,
            actionText: area.action.title,
            reactionText: area.reactions.title,
            title: area.title,
          });
        });
      })
      .catch((error) => {
        console.error("Erreur de requête:", error);
      });
  }

  goToAreas() {
    this.router.navigate(["/dashboard/a-rea"]);
  }

  openDocuYoutube() {
    const youtubeUrl = "https://www.youtube.com/watch?v=wrFsapf0Enk&t=162s";
    window.open(youtubeUrl, "_blank");
  }

  nextIcon() {
    if (this.currentIndex < this.services.length - 4) {
      this.currentIndex++;
    }
  }

  prevIcon() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
