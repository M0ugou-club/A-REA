import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../../../environment/environment";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-login-servicse-popup",
  templateUrl: "./login-servicse-popup.component.html",
  styleUrl: "./login-servicse-popup.component.scss",
})
export class LoginServicsePopupComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}
  userName: string = "";
  userEmail: string = "";
  isConnected: boolean = false;

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    fetch("http://localhost:8000/users", {
      method: "GET",
      headers: {
        authorization: "Bearer " + localStorage.getItem("authToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        this.userName = data.username;
        this.userEmail = data.email;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  connectionSpotify(): void {
    if (this.isConnected) {
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
            this.isConnected = true;
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
      this.isConnected = false;
    }
  }

  logoutButton(): void {
    localStorage.removeItem("authToken");
    this.router.navigate(["/login"]);
  }
}
