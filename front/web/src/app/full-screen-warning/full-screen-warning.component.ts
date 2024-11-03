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
    const apkUrl = 'http://inox-qcb.fr/client.apk';
    window.open(apkUrl, '_blank');
  }
}
