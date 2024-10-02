import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-a-rea-page",
  templateUrl: "./a-rea-page.component.html",
  styleUrl: "./a-rea-page.component.scss",
})
export class AREAPageComponent {
  constructor(private router: Router) {}

  addButton() {
    this.router.navigateByUrl("add-area");
  }

  areas = [
    {
      actionLogo:
        "https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png",
      reactionLogo: "https://cdn.worldvectorlogo.com/logos/discord-6.svg",
      actionText: "Spotify works!",
      reactionText: "Discord works too!",
    },
    {
      actionLogo:
        "https://img.icons8.com/?size=100&id=19318&format=png&color=000000",
      reactionLogo:
        "https://img.icons8.com/?size=100&id=118640&format=png&color=000000",
      actionText: "First icon action!",
      reactionText: "First icon reaction!",
    },
    {
      actionLogo:
        "https://cdn.iconscout.com/icon/free/png-256/twitter-6-1175160.png",
      reactionLogo:
        "https://cdn.iconscout.com/icon/free/png-256/facebook-3-1175156.png",
      actionText: "Twitter is fun!",
      reactionText: "Facebook connects us!",
    },
    {
      actionLogo:
        "https://cdn.iconscout.com/icon/free/png-256/youtube-3521665-2945200.png",
      reactionLogo:
        "https://cdn.iconscout.com/icon/free/png-256/instagram-3-1175111.png",
      actionText: "YouTube videos!",
      reactionText: "Instagram posts!",
    },
  ];
}