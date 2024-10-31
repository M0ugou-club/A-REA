import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../../environment/environment";

@Component({
  selector: "app-loginPage",
  templateUrl: "./loginPage.component.html",
  styleUrl: "./loginPage.component.scss",
})
export class LoginPageComponent implements OnInit {
  constructor(private router: Router) {}

  loginObj: any = {
    email: "",
    password: "",
  };

  ngOnInit() {
    const localData = localStorage.getItem("authToken");

    if (localData != null) {
      fetch(`${environment.apiUrl}/isLogged`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localData,
        },
      })
        .then((response) => {
          if (response.status == 200) {
            this.router.navigate(["/dashboard"]);
          }
        })
        .catch((error) => {
          console.error("Erreur de requête:", error);
        });
    }
  }

  goToRegister(): void {
    this.router.navigate(["/register"]);
  }

  onLogin() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(this.loginObj.email)) {
      alert("Veuillez entrer une adresse email valide.");
      return;
    }

    if (!this.loginObj.email || !this.loginObj.password) {
      alert(
        "Veuillez remplir tous les champs : email, nom d'utilisateur et mot de passe."
      );
      return;
    }

    fetch(`${environment.apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.loginObj),
    })
      .then((response) => {
        if (response.status === 404) {
          alert("Username invalid");
          return null;
        } else if (response.status === 401) {
          alert("Password invalid");
          return null;
        } else if (response.status === 200) {
          return response.json().then((data) => {
            const token = data.token;

            localStorage.setItem("authToken", token);
            this.router.navigate(["/dashboard"]);
          });
        }
        return null;
      })
      .catch((error) => {
        console.error("Erreur de réseau:", error);
      });
  }
}
