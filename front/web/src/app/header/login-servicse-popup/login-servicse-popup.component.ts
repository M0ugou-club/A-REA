import { Component } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login-servicse-popup',
  templateUrl: './login-servicse-popup.component.html',
  styleUrl: './login-servicse-popup.component.scss'
})
export class LoginServicsePopupComponent {

  constructor(private router: Router, private http: HttpClient) { }

  buttonSpotify(): void {
    const clientId = environment.spotifyClientId;
    const redirectUri = encodeURIComponent(environment.redirectUri);
    const scope = encodeURIComponent('user-read-private user-read-email');

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;

    window.location.href = authUrl;
  }

  logoutButton(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

}
