import { Component, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-full-screen-warning',
  templateUrl: './full-screen-warning.component.html',
  styleUrl: './full-screen-warning.component.scss'
})
export class FullScreenWarningComponent {
  isSmallScreen: boolean = false;

  constructor(private renderer: Renderer2) {}

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

  downloadAPK() {
    const apkUrl = '/public/A-Rea.apk';
    const link = document.createElement('a');
    link.href = apkUrl;
    link.download = 'A-Rea.apk';
    link.click();
  }
}
