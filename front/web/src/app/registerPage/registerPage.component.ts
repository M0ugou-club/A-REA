import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../../environment/environment";

@Component({
  selector: "app-loginPage",
  templateUrl: "./registerPage.component.html",
  styleUrl: "./registerPage.component.scss",
})
export class RegisterPageComponent implements OnInit {
  RegisterObj = {
    name: "",
    surname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  constructor(private router: Router) {}

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

  goToLogin(): void {
    this.router.navigate(["/login"]);
  }

  onRegister() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (
      !this.RegisterObj.name ||
      !this.RegisterObj.surname ||
      !this.RegisterObj.email ||
      !this.RegisterObj.password ||
      !this.RegisterObj.passwordConfirm
    ) {
      alert(
        "Veuillez remplir tous les champs : email, nom d'utilisateur et mot de passe."
      );
      return;
    }

    if (!emailRegex.test(this.RegisterObj.email)) {
      alert("Veuillez entrer une adresse email valide.");
      return;
    }

    if (this.RegisterObj.password !== this.RegisterObj.passwordConfirm) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    fetch(`${environment.apiUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.RegisterObj),
    })
      .then((response) => {
        if (response.status === 500) {
          alert("Email invalid");
        }
        if (response.status === 201) {
          this.router.navigate(["/login"]);
        }
      })
      .catch((error) => {
        console.error("Erreur de requête:", error);
      });
  }
}
