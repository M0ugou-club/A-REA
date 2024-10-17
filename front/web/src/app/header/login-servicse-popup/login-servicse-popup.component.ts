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
  youtubeLogin: boolean = false;
  instagramLogin: boolean = false;

  ngOnInit(): void {
    fetch('https://localhost:8000/users', {
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
    fetch('https://localhost:8000/tokens/state', {
        method: 'GET',
        headers: {
            'authorization': 'Bearer ' + localStorage.getItem('authToken')
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        this.spotifyLogin = data.Spotify;
        this.discordLogin = data.Discord;
        this.twitterLogin = data.Twitter;
        this.youtubeLogin = data.Youtube;
        this.instagramLogin = data.Instagram;
    })
  }

  buttonSpotify(): void {
    if (this.spotifyLogin) {
      this.spotifyLogin = false;
      fetch('https://localhost:8000/tokens/platform/Spotify', {
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
        window.location.href = 'https://localhost:8000/oauth/Spotify?token=' + localStorage.getItem('authToken');
    }
  }

  buttonDiscord(): void {
    //connect to discord service api
  }

  buttonTwitter(): void {
    //connect to twitter service api
  }

  buttonYoutube(): void {
    if (this.youtubeLogin) {
      this.youtubeLogin = false;
      fetch('https://localhost:8000/tokens/platform/Youtube', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + localStorage.getItem('authToken')
        },
        body: JSON.stringify({
            "platform": "Youtube"
        }),
      })
      .then(response => response.json())
      .then(data => {
          if (data.status === 'success') {
            this.youtubeLogin = false;
          }
      })
      .catch((error) => {
          console.error('Error:', error);
      });
    } else {
          window.location.href = 'https://localhost:8000/oauth/Youtube?token=' + localStorage.getItem('authToken');
    }
  }

  buttonInstagram(): void {
    if (this.instagramLogin) {
      this.instagramLogin = false;
      fetch('https://localhost:8000/tokens/platform/Instagram', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + localStorage.getItem('authToken')
        },
        body: JSON.stringify({
            "platform": "Instagram"
        }),
      })
      .then(response => response.json())
      .then(data => {
          if (data.status === 'success') {
            this.instagramLogin = false;
          }
      })
      .catch((error) => {
          console.error('Error:', error);
      });
    } else {
          window.location.href = 'https://localhost:8000/oauth/Instagram?token=' + localStorage.getItem('authToken');
    }
  }

  logoutButton(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

}
