import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrl: "./form.component.scss",
})
export class FormComponent implements OnInit {
  isRegister: boolean = false;

  RegisterUsers: any[] = [];

  RegisterObj: any = {
    email: "",
    username: "",
    password: "",
  };

  loginObj: any = {
    email: "",
    password: "",
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    const localData = localStorage.getItem("authToken");

    if (localData != null) {
      fetch("http://localhost:8000/isLogged", {
        method: "GET",
        headers: {
          Authorization: localData,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            this.router.navigate(["/"]);
          }
        })
        .catch((error) => {
          console.error("Erreur de requête:", error);
        });
    }
  }

  onRegister() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    console.log(this.RegisterObj);
    if (
      !this.RegisterObj.email ||
      !this.RegisterObj.username ||
      !this.RegisterObj.password
    ) {
      alert(
        "Veuillez remplir tous les champs : email, nom d'utilisateur et mot de passe.",
      );
      return;
    }

    if (!emailRegex.test(this.RegisterObj.email)) {
      alert("Veuillez entrer une adresse email valide.");
      return;
    }

    this.RegisterUsers.push(this.RegisterObj);

    fetch("http://localhost:8000/register", {
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
          console.log("Inscription réussie:");
          this.isRegister = true;
        }
      })
      .catch((error) => {
        console.error("Erreur de requête:", error);
      });
  }

  onLogin() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(this.loginObj.email)) {
      alert("Veuillez entrer une adresse email valide.");
      return;
    }

    if (!this.loginObj.email || !this.loginObj.password) {
      alert(
        "Veuillez remplir tous les champs : email, nom d'utilisateur et mot de passe.",
      );
      return;
    }

    console.log(JSON.stringify(this.loginObj));

    fetch("http://localhost:8000/login", {
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
            console.log("Login réussie:");

            const token = data.token;

            localStorage.setItem("authToken", token);
            this.router.navigate(["/"]);
          });
        }
        return null;
      })
      .catch((error) => {
        console.error("Erreur de réseau:", error);
      });
  }

  goToLogin(): void {
    this.isRegister = true;
  }

  goToRegister(): void {
    this.isRegister = false;
  }
}
