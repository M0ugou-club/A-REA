type ConnectionFunction = {
  key: string;
  func: () => void;
};

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
  connections: any[] = [];
  services: { [key: string]: any } = {};
  connectionFunctions: ConnectionFunction[] = [
    {
      key: "Spotify",
      func: () => this.connectionSpotify(),
    },
    {
      key: "Youtube",
      func: () => this.connectionYoutube(),
    },
    {
      key: "Discord",
      func: () => this.connectionDiscord(),
    },
    {
      key: "X",
      func: () => this.connectionX(),
    },
    {
      key: "Reddit",
      func: () => this.connectionReddit(),
    },
    {
      key: "TikTok",
      func: () => this.connectionTiktok(),
    },
  ];

  ngOnInit(): void {
    this.getUserInfo();
    this.getServiceInfo();
    this.getServiceState();
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

  getServiceInfo() {
    fetch("http://localhost:8000/enums/platforms_icons", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
        }
        return response.json();
      })
      .then((data) => {
        this.services = data;
      })
      .catch((error) => {
        console.error("Erreur de requête:", error);
      });
  }

  getServiceEntries(services: { [key: string]: any }): [string, any][] {
    return Object.entries(services);
  }

  getServiceState() {
    fetch("http://localhost:8000/tokens/state", {
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
        this.connections = this.getServiceEntries(data);
      })
      .catch((error) => {
        console.error("Erreur de requête:", error);
      });
  }

  connectionSpotify(): void {
    if (this.isConnectedToService("Spotify") == true) {
      fetch("http://localhost:8000/tokens/platform/Spotify", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          platform: "Spotify",
        }),
      });
    } else {
      window.location.href =
        "http://localhost:8000/oauth/Spotify?token=" +
        localStorage.getItem("authToken");
    }
  }

  connectionYoutube(): void {
    if (this.isConnectedToService("Youtube") == true) {
      fetch("http://localhost:8000/tokens/platform/Youtube", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          platform: "Spotify",
        }),
      }).catch((error) => {
        console.error("Error:", error);
      });
    } else {
      window.location.href =
        "http://localhost:8000/oauth/Youtube?token=" +
        localStorage.getItem("authToken");
    }
  }

  connectionDiscord(): void {
    if (this.isConnectedToService("Discord") == true) {
      fetch("http://localhost:8000/tokens/platform/Discord", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          platform: "Discord",
        }),
      }).catch((error) => {
        console.error("Error:", error);
      });
    } else {
      window.location.href =
        "http://localhost:8000/oauth/Discord?token=" +
        localStorage.getItem("authToken");
    }
  }

  connectionX(): void {
    if (this.isConnectedToService("X") == true) {
      fetch("http://localhost:8000/tokens/platform/X", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          platform: "Spotify",
        }),
      }).catch((error) => {
        console.error("Error:", error);
      });
    } else {
      window.location.href =
        "http://localhost:8000/oauth/X?token=" +
        localStorage.getItem("authToken");
    }
  }

  connectionReddit(): void {
    if (this.isConnectedToService("Reddit") == true) {
      fetch("http://localhost:8000/tokens/platform/X", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          platform: "Spotify",
        }),
      }).catch((error) => {
        console.error("Error:", error);
      });
    } else {
      window.location.href =
        "http://localhost:8000/oauth/Reddit?token=" +
        localStorage.getItem("authToken");
    }
  }

  connectionTiktok(): void {
    if (this.isConnectedToService("TikTok") == true) {
      fetch("http://localhost:8000/tokens/platform/TikTok", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          platform: "Spotify",
        }),
      }).catch((error) => {
        console.error("Error:", error);
      });
    } else {
      window.location.href =
        "http://localhost:8000/oauth/TikTok?token=" +
        localStorage.getItem("authToken");
    }
  }

  chooseConnection(service: string) {
    const connection = this.connectionFunctions.find(
      (item) => item.key === service
    );

    if (connection) {
      connection.func();
    } else {
      console.log("No connection function found");
    }
  }

  isConnectedToService(service: string): boolean {
    for (const service_search of this.connections) {
      if (service_search[0] === service) {
        return service_search[1];
      }
    }
    return false;
  }

  logoutButton(): void {
    localStorage.removeItem("authToken");
    this.router.navigate(["/login"]);
  }
}
