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

  users: any = [];

  ngOnInit(): void {
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

    this.GetUsers();
  }

  GetUsers(): void {
    fetch("http://localhost:8000/usersAlls", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        this.users = data;
      })
      .catch((error) => {
        console.error("Erreur de requête:", error);
      });
  }
}
