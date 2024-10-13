import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../../../../environment/environment";

@Component({
  selector: "app-login-service",
  templateUrl: "./login-service.component.html",
  styleUrl: "./login-service.component.scss",
})
export class LoginServiceComponent {
  @Input() serviceName: string = "";
  @Input() serviceIcon: string = "";
  @Input() serviceColor: string = "";

  functionsMap: { [key: string]: () => void };

  constructor(private router: Router) {
    this.functionsMap = {
      Spotify: this.connectionSpotify,
    };
  }

  serviceConnectionStatus: boolean = false;

  connectionServiceGestion(): void {
    const serviceFunction = this.functionsMap[this.serviceName];
    serviceFunction();
  }

  connectionSpotify(): void {
    if (this.serviceConnectionStatus) {
      fetch("http://localhost:8000/tokens/platform/Spotify", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          platform: "Spotify",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            this.serviceConnectionStatus = false;
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      const clientId = environment.spotifyClientId;
      const redirectUri = encodeURIComponent(environment.redirectUri);
      const scope = encodeURIComponent(
        "user-read-private user-read-email user-read-playback-state user-modify-playback-state streaming user-library-modify user-library-read"
      );
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
      window.location.href = authUrl;
      this.serviceConnectionStatus = true;
    }
  }
}
