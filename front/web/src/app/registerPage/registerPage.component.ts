import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../../environment/environment";
import { ToastrService } from 'ngx-toastr';


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
    image: "",
  };

  constructor(private router: Router, private toastr: ToastrService) {}

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

  private loadDefaultProfileImage(): Promise<string> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        const reader = new FileReader();
        reader.onloadend = function() {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', '/header/template-user.png');
      xhr.responseType = 'blob';
      xhr.send();
    });
  }

  async onRegister() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (
      !this.RegisterObj.name ||
      !this.RegisterObj.surname ||
      !this.RegisterObj.email ||
      !this.RegisterObj.password ||
      !this.RegisterObj.passwordConfirm
    ) {
      this.toastr.error('Veuillez remplir tous les champs : email, nom d\'utilisateur et mot de passe.');
      return;
    }

    if (!emailRegex.test(this.RegisterObj.email)) {
      this.toastr.error('Veuillez entrer une adresse email valide.');
      this.removeInfoInput();
      return;
    }

    if (this.RegisterObj.password !== this.RegisterObj.passwordConfirm) {
      this.toastr.error('Les mots de passe ne correspondent pas.');
      this.removeInfoInput();
      return;
    }

    try {
      this.RegisterObj.image = await this.loadDefaultProfileImage();

      fetch(`${environment.apiUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.RegisterObj),
      })
        .then((response) => {
          this.removeInfoInput();
          if (response.status === 500) {
            this.toastr.error('Email déjà utilisé');
            return;
          }
          if (response.status === 201) {
            this.router.navigate(["/login"]);
            this.toastr.success('Inscription réussie');
          }
        })
        .catch((error) => {
          this.toastr.error('Problème de réseau');
        });
    } catch (error) {
      this.toastr.error('Erreur lors du chargement de l\'image par défaut');
    }
  }

  removeInfoInput() {
    this.RegisterObj.name = '';
    this.RegisterObj.surname = '';
    this.RegisterObj.email = '';
    this.RegisterObj.password = '';
    this.RegisterObj.passwordConfirm = '';
  }
}
