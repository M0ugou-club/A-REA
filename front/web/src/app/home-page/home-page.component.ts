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

  inoxbest(): void {
    const accessToken = localStorage.getItem('accesToken');
    const artistId = '44BwcqsS9V20HWSeql39ah';
    const countryCode = 'FR';
    const url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=${countryCode}`;
  
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  spotifyloggin(): void {
    console.log('zizi de pierre');

    const clientId = environment.spotifyClientId;
    const redirectUri = encodeURIComponent(environment.redirectUri);
    const scope = encodeURIComponent('user-read-private user-read-email');

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;

    window.location.href = authUrl;
  }
}
