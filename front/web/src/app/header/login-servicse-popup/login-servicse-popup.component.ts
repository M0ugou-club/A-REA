import { Component, OnInit } from "@angular/core";
import { environment } from "../../../../environment/environment";
import { Router } from "@angular/router";
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

  ngOnInit(): void {
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

  logoutButton(): void {
    localStorage.removeItem("authToken");
    this.router.navigate(["/login"]);
  }
}
