import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { reduce } from "rxjs";
import { environment } from "../../../environment/environment";

@Component({
  selector: "app-a-rea-page",
  templateUrl: "./a-rea-page.component.html",
  styleUrl: "./a-rea-page.component.scss",
})
export class AreaPageComponent implements OnInit {
  areaObj: any = {
    area_title: "",
    area_description: "",
    action_name: "",
    action_description: "",
    action_type: "",
    action_platform: "",
    reaction_name: "",
    reaction_description: "",
    reaction_type: "",
    reaction_platform: "",
  };

  areas: {
    areaId: number;
    actionService: string;
    reactionService: string;
    actionText: string;
    reactionText: string;
    title: string;
  }[] = [];

  actions: any[] = [];

  reactions: any[] = [];

  servicesIcon: any = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const localData = localStorage.getItem("authToken");

    console.log(localData);

    if (localData != null) {
      fetch(`${environment.apiUrl}/isLogged`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localData,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            this.loadAReas();
            this.loadActions();
            this.loadReactions();
            this.loadServicesIcons();
          } else {
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

  loadAReas(): void {
    fetch(`${environment.apiUrl}/areas`, {
      method: "GET",
      headers: {
        authorization: "Bearer " + localStorage.getItem("authToken"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);

        data.forEach((area: any) => {
          this.areas.push({
            areaId: area._id,
            actionService: area.action.platform,
            reactionService: area.reactions.platform,
            actionText: area.action.title,
            reactionText: area.reactions.title,
            title: area.title,
          });
          console.log(this.areas);
        });
      })
      .catch((error) => {
        console.error("Erreur de requête:", error);
      });
  }

  loadActions(): void {
    fetch(`${environment.apiUrl}/enums/actions`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
        }
        return response.json();
      })
      .then((data) => {
        this.actions = this.flatten(data);
      })
      .catch((error) => {
        console.error("Erreur de requête:", error);
      });
  }

  loadReactions(): void {
    fetch(`${environment.apiUrl}/enums/reactions`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
        }
        return response.json();
      })
      .then((data) => {
        this.reactions = this.flatten(data);
      })
      .catch((error) => {
        console.error("Erreur de requête:", error);
      });
  }

  loadServicesIcons(): void {
    fetch(`${environment.apiUrl}/enums/platforms_icons`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
        }
        return response.json();
      })
      .then((data) => {
        this.servicesIcon = data;
      })
      .catch((error) => {
        console.error("Erreur de requête:", error);
      });
  }

  flatten(data: any) {
    let actionsArray: any = [];

    Object.keys(data).forEach((service) => {
      Object.keys(data[service]).forEach((actionKey) => {
        actionsArray.push({
          service: service,
          actionKey: actionKey,
          label: data[service][actionKey],
        });
      });
    });

    console.log(actionsArray);
    return actionsArray;
  }

  setAction(action: string) {
    const actionObj: any = this.actions.find((x) => x.label === action);
    this.areaObj.action_name = actionObj.label;
    this.areaObj.action_type = actionObj.actionKey;
    this.areaObj.action_platform = actionObj.service;
    console.log(this.areaObj);
  }

  setReaction(reaction: string) {
    const reactionObj: any = this.reactions.find((x) => x.label === reaction);
    this.areaObj.reaction_name = reactionObj.label;
    this.areaObj.reaction_type = reactionObj.actionKey;
    this.areaObj.reaction_platform = reactionObj.service;
    console.log(this.areaObj);
  }

  resetSelection() {
    this.areaObj.area_title = "";
    this.areaObj.area_description = "";
    this.areaObj.action_name = "";
    this.areaObj.reaction_name = "";
  }

  approveSelection() {
    const localData = "Bearer " + localStorage.getItem("authToken");

    fetch(`${environment.apiUrl}/areas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localData,
      },
      body: JSON.stringify(this.areaObj),
    })
      .then((response) => {
        if (!response.ok) {
          alert("Vous n'avez pas rempli tous les champs");
          return;
        }
        window.location.reload();
      })
      .catch((error) => {
        console.error("Erreur de requête:", error);
      });
  }

  chooseColor(choice: string) {
    for (let key in this.servicesIcon) {
      if (key === choice) {
        return this.servicesIcon[key].color;
      }
    }
    return "";
  }

  protected readonly reduce = reduce;
}
