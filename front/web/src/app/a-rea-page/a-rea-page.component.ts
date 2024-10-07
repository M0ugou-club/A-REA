import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-a-rea-page",
  templateUrl: "./a-rea-page.component.html",
  styleUrls: ["./a-rea-page.component.scss"],
})
export class AREAPageComponent implements OnInit {
  constructor(private router: Router) {}

  private apiUrl = "http://localhost:8000/areas";

  areas: {
    actionLogo: string;
    reactionLogo: string;
    actionText: string;
    reactionText: string;
    title: string;
  }[] = [];

  addButton() {
    this.router.navigateByUrl("add-a-rea");
  }

  ngOnInit(): void {
    const localData = localStorage.getItem("authToken");

    if (localData != null) {
      fetch("http://localhost:8000/isLogged", {
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
          console.error("Request error:", error);
        });
    } else {
      this.router.navigate(["/login"]);
    }

    fetch(this.apiUrl, {
      method: "GET",
      headers: {
        authorization: "Bearer " + localStorage.getItem("authToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);

        data.forEach((area: any) => {
          const reactionPlatform =
            area.reactions && area.reactions.length > 0
              ? area.reactions[0].platform
              : "No reaction";
          this.areas.push({
            actionLogo: "https://cdn.worldvectorlogo.com/logos/discord-6.svg",
            reactionLogo: "https://cdn.worldvectorlogo.com/logos/discord-6.svg",
            actionText: area.action.platform,
            reactionText: reactionPlatform,
            title: area.title,
          });
        });
      })
      .catch((error) => {
        console.error("Error fetching areas:", error);
      });
  }
}
