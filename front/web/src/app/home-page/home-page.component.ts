import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})

export class HomePageComponent implements OnInit{

  constructor(private router: Router) {}
  userName: string = "";
  userEmail: string = "";

  ngOnInit(): void {
    this.getUserInfo();
    const localData = localStorage.getItem('authToken');

    if (localData != null) {
      fetch("http://localhost:8000/isLogged", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localData
        }
      })
          .then(response => {
            if (response.status != 200) {
              this.router.navigate(['/login']);
            }
          })
          .catch((error) => {
            console.error('Erreur de requête:', error);
          });
    } else {
      this.router.navigate(['/login']);
    }
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
}
