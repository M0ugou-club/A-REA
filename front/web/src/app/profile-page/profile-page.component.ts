import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { environment } from "../../../environment/environment";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})

export class ProfilePageComponent {
  constructor(private router: Router) {}
  userName: string = "";
  userSurname: string = "";
  userEmail: string = "";

  changeMDPObj = {
    oldPassword: '',
    newPassword: ''
  };

  ngOnInit(): void {
    this.getUserInfo();
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
        console.log("Success:", data);
        this.userName = data.name;
        this.userEmail = data.email;
        this.userSurname = data.surname;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  changeMDP() {
    console.log("change de mdp");
  }
}
