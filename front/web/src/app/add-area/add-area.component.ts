import { Component } from "@angular/core";

@Component({
  selector: "app-add-area",
  templateUrl: "./add-area.component.html",
  styleUrl: "./add-area.component.scss",
})
export class AddAreaComponent {
  areaObj: any = {
    title: "",
    action: "",
    reaction: "",
    updateDelay: "60",
  };

  services: string[] = [
    "Spotify",
    "Youtube",
    "Discord",
    "Twitch",
    "PH",
    "TikTok",
  ];

  setAction(action: string) {
    this.areaObj.action = action;
    console.log(this.areaObj);
  }

  setReaction(reaction: string) {
    console.log("reaction", reaction);
    this.areaObj.reaction = reaction;
    console.log(this.areaObj);
  }

  resetSelection() {
    this.areaObj.action = "";
    this.areaObj.reaction = "";
  }

  approuveSelection() {
    console.log(this.areaObj);
  }
}
