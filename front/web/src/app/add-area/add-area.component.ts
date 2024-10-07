import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-area",
  templateUrl: "./add-area.component.html",
  styleUrl: "./add-area.component.scss",
})
export class AddAreaComponent implements OnInit {
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

  actions: any[] = [];

  reactions: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const localData = localStorage.getItem("authToken");

    console.log(localData);

    if (localData != null) {
      fetch("http://localhost:8000/isLogged", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localData,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            fetch("http://localhost:8000/enums/actions", {
              method: "GET",
            })
              .then((response) => {
                if (!response.ok) {
                  console.log(response);
                }
                return response.json();
              })
              .then((data) => {
                this.actions = this.flattenActions(data);
              })
              .catch((error) => {
                console.error("Erreur de requête:", error);
              });
            fetch("http://localhost:8000/enums/reactions", {
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
                this.reactions = this.flattenActions(data);
              })
              .catch((error) => {
                console.error("Erreur de requête:", error);
              });
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

  flattenActions(data: any) {
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
    this.areaObj.action_name = "";
    this.areaObj.reaction_name = "";
  }

  approveSelection() {
    const localData = "Bearer " + localStorage.getItem("authToken");

    fetch("http://localhost:8000/areas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localData,
      },
      body: JSON.stringify(this.areaObj),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Erreur de requête:", error);
      });

    this.router.navigate(["/a-rea"]);
  }
}
