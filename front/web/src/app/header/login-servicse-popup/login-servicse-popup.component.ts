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
  userName: string = 'UserName';
  userEmail: string = 'Email';
  spotifyLogin: boolean = false;
  discordLogin: boolean = false;
  twitterLogin: boolean = false;

  ngOnInit(): void {
    fetch('http://localhost:8000/users', {
        method: 'GET',
        headers: {
            'authorization': 'Bearer ' + localStorage.getItem('authToken')
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        this.userName = data.username;
        this.userEmail = data.email;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    fetch('http://localhost:8000/tokens/state', {
        method: 'GET',
        headers: {
            'authorization': 'Bearer ' + localStorage.getItem('authToken')
        },
    })
    .then(response => response.json())
    .then(data => {
        this.spotifyLogin = data.Spotify;
        this.discordLogin = data.Discord;
        this.twitterLogin = data.Twitter;
    })
  }

  buttonSpotify(): void {
    if (this.spotifyLogin) {
      this.spotifyLogin = false;
      fetch('http://localhost:8000/tokens/platform/Spotify', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + localStorage.getItem('authToken')
        },
        body: JSON.stringify({
            "platform": "Spotify"
        }),
      })
      .then(response => response.json())
      .then(data => {
          if (data.status === 'success') {
            this.spotifyLogin = false;
          }
      })
      .catch((error) => {
          console.error('Error:', error);
      });
    } else {
      const clientId = environment.spotifyClientId;
      const redirectUri = encodeURIComponent(environment.redirectUri);
      const scope = encodeURIComponent('user-read-private user-read-email user-read-playback-state user-modify-playback-state streaming');
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
      window.location.href = authUrl;
      this.spotifyLogin = true;
    }
  }

  buttonDiscord(): void {
    //connect to discord service api
  }

  buttonTwitter(): void {
    //connect to twitter service api
  }

  logoutButton(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

}
