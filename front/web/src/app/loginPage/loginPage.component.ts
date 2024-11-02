import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../../environment/environment";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-loginPage",
  templateUrl: "./loginPage.component.html",
  styleUrl: "./loginPage.component.scss",
})
export class LoginPageComponent implements OnInit {
  constructor(private router: Router, private toastr: ToastrService) {}

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
          this.toastr.error('Problème de réseau');
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
      this.toastr.error('Veuillez entrer une adresse email valide.');
      this.loginObj.email = '';
      this.loginObj.password = '';
      return;
    }

    if (!this.loginObj.email || !this.loginObj.password) {
      this.toastr.error('Veuillez remplir tous les champs : email, nom d\'utilisateur et mot de passe.');
      this.loginObj.email = '';
      this.loginObj.password = '';
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
        this.loginObj.email = '';
        this.loginObj.password = '';
        if (response.status === 404) {
          this.toastr.error('Nom d\'utilisateur invalide');
          return null;
        } else if (response.status === 401) {
          this.toastr.error('Mot de passe invalide');
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
        this.toastr.error('Problème de réseau');
      });
  }
}
