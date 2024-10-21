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
    startColor: string;
    endColor: string;
  }[] = [];

  plaformsIcon: any = [];

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

    this.loadPlatformsIcons()
      .then(() => {
        return fetch(this.apiUrl, {
          method: "GET",
          headers: {
            authorization: "Bearer " + localStorage.getItem("authToken"),
          },
        });
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
            actionLogo: this.chooseIcon(area.action.platform),
            reactionLogo: this.chooseIcon(reactionPlatform),
            actionText: area.action.platform,
            reactionText: reactionPlatform,
            title: area.title,
            startColor: this.chooseColor(area.action.platform),
            endColor: this.chooseColor(reactionPlatform),
          });
        });
      })
      .catch((error) => {
        console.error("Error fetching areas:", error);
      });
  }

  loadPlatformsIcons(): Promise<void> {
    return fetch("http://localhost:8000/enums/platforms_icons", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.plaformsIcon = data;
      })
      .catch((error) => {
        console.error("Error fetching platform icons:", error);
      });
  }

  chooseIcon(choice: string) {
    if (!this.plaformsIcon || !choice) return '';
    if (this.plaformsIcon[choice]) {
      console.log(this.plaformsIcon[choice].icon);
      return this.plaformsIcon[choice].icon;
    }
    return '';
  }

  chooseColor(choice: string) {
    if (!this.plaformsIcon || !choice) return '';
    if (this.plaformsIcon[choice]) {
      return this.plaformsIcon[choice].color;
    }
    return '#429660';
  }
}
