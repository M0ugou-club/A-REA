import { Component, HostListener, Renderer2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Component({
  selector: 'app-full-screen-warning',
  templateUrl: './full-screen-warning.component.html',
  styleUrl: './full-screen-warning.component.scss'
})
export class FullScreenWarningComponent {
  isSmallScreen: boolean = false;

  constructor(private renderer: Renderer2, private toastr: ToastrService, private http: HttpClient) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    if (window.innerWidth < 800 || window.innerHeight < 568) {
      this.isSmallScreen = true;
    } else {
      this.isSmallScreen = false;
    }

    if (this.isSmallScreen) {
      this.renderer.addClass(document.body, 'blurred-background');
    } else {
      this.renderer.removeClass(document.body, 'blurred-background');
    }
  }

  downloadApk() {
    const url = './assets/A-Rea.apk'; // Remplace par le chemin de ton fichier .apk

    console.log('Téléchargement du fichier APK...');
    this.http.head(url).pipe(
      catchError((err) => {
        console.log(("errrror"))
        this.toastr.error('Erreur lors de la vérification du fichier.'); // Afficher une notification
        alert('Le fichier n\'existe pas à cette URL.'); // Avertir l'utilisateur
        return of(null); // Retourner un observable vide
      })
    ).subscribe({
      next: (response) => {
        if (response) {
          // Si la réponse existe, cela signifie que le fichier existe
          const link = document.createElement('a');
          link.href = url;
          link.download = 'YourAppName.apk'; // Nom de téléchargement
          link.click();
          this.toastr.success('Téléchargement du fichier APK en cours...'); // Afficher une notification
        }
      }
    });
  }
}
