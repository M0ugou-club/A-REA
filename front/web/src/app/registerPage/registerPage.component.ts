import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-loginPage",
  templateUrl: "./registerPage.component.html",
  styleUrl: "./registerPage.component.scss",
})

export class RegisterPageComponent implements OnInit, AfterViewInit {

  RegisterObj = {
    email: '',
    username: '',
    password: ''
  };

  constructor(private router: Router) {}

  ngOnInit() {
    console.log("Before");
  }

  ngAfterViewInit() {
    console.log("After");
  }

  goToRegister(): void {
    this.router.navigate(['/login']);
  }

  onRegister() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

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

    fetch("https://localhost:8000/register", {
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
          this.router.navigate(['/login']);
        }
      })
      .catch((error) => {
        console.error("Erreur de requête:", error);
      });
  }
}
