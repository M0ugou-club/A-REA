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

  ngOnInit(): void {
    const localData = localStorage.getItem('authToken');

    if (localData != null) {
      fetch("https://localhost:8000/isLogged", {
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
}
