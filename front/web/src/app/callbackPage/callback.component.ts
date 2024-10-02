import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackPageComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    const code = this.getCodeFromUrl();
    if (code) {
      this.exchangeCodeForToken(code);
    } else {
      console.error('No code found in URL');
    }
  }

  private getCodeFromUrl(): string | null {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('code');
  }

  private exchangeCodeForToken(code: string): void {
    const clientId = environment.spotifyClientId;
    const clientSecret = '757a766724a84502b6a4b406aa3d3a48';
    const redirectUri = environment.redirectUri;

    this.http.post('https://accounts.spotify.com/api/token', new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret
    }).toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).subscribe({
      next: (response: any) => {
        const accessToken = response.access_token;
        const refreshToken = response.refresh_token;
        console.log('Access token:', accessToken);
        console.log('Refresh token:', refreshToken);
        fetch('http://localhost:8000/tokens/user/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'authorization': 'Bearer ' + localStorage.getItem('authToken')
          },
          body: JSON.stringify({
              "platform": "Spotify",
              accesstoken: accessToken,
              refreshtoken: refreshToken,
              "validity": "2024-09-30T16:07:11.695+00:00"
          }),
      })
      .then(response => response.json())
      .then(data => {
          console.log('Success:', data);
          this.router.navigate(['/home']);
      })
      .catch((error) => {
          console.error('Error:', error);
      });
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error exchanging code for token:', error);
      }
    });
  }
}
