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
  userSurname: string = "";
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
      key: "Twitch",
      func: () => this.connectionTwitch(),
    },
    {
      key: "X",
      func: () => this.connectionX(),
    },
    {
      key: "Reddit",
      func: () => this.connectionReddit(),
    },
  ];

  ngOnInit(): void {
    this.getUserInfo();
    this.getServiceInfo();
    this.getServiceState();
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
        this.userSurname = data.surname;
        this.userEmail = data.email;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  getServiceInfo() {
    fetch(`${environment.apiUrl}/enums/platforms_icons`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          console.error(response);
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
    fetch(`${environment.apiUrl}/tokens/state`, {
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
        this.connections = this.getServiceEntries(data);
      })
      .catch((error) => {
        console.error("Erreur de requête:", error);
      });
  }

  connectionSpotify(): void {
    if (this.isConnectedToService("Spotify") == true) {
      fetch(`${environment.apiUrl}/tokens/platform/Spotify`, {
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
        `${environment.apiUrl}/oauth/Spotify?token=` +
        localStorage.getItem("authToken");
    }
  }

  connectionYoutube(): void {
    if (this.isConnectedToService("Youtube") == true) {
      fetch(`${environment.apiUrl}/tokens/platform/Youtube`, {
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
        `${environment.apiUrl}/oauth/Youtube?token=` +
        localStorage.getItem("authToken");
    }
  }

  connectionTwitch(): void {
    if (this.isConnectedToService("Twitch") == true) {
      fetch(`${environment.apiUrl}/tokens/platform/Twitch`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          platform: "Twitch",
        }),
      }).catch((error) => {
        console.error("Error:", error);
      });
    } else {
      window.location.href =
        `${environment.apiUrl}/oauth/Twitch?token=` +
        localStorage.getItem("authToken");
    }
  }

  connectionX(): void {
    if (this.isConnectedToService("X") == true) {
      fetch(`${environment.apiUrl}/tokens/platform/X`, {
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
        `${environment.apiUrl}/oauth/X?token=` +
        localStorage.getItem("authToken");
    }
  }

  connectionReddit(): void {
    if (this.isConnectedToService("Reddit") == true) {
      fetch(`${environment.apiUrl}/tokens/platform/X`, {
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
        `${environment.apiUrl}/oauth/Reddit?token=` +
        localStorage.getItem("authToken");
    }
  }

  downloadAPK() {
    const apkUrl = `http://localhost:8081/client.apk`;
    window.open(apkUrl, '_blank');
  }


  chooseConnection(service: string) {
    const connection = this.connectionFunctions.find(
      (item) => item.key === service
    );

    if (connection) {
      connection.func();
    } else {
      console.error("No connection function found");
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

  goToProfile(): void {
    this.router.navigate(["dashboard/profile"]);
  }
}
