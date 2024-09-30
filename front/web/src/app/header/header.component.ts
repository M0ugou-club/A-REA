import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  ngOnInit(): void {
    this.setScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.setScreenSize();
  }

  setScreenSize(): void {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    document.documentElement.style.setProperty('--screen-width', `${screenWidth}px`);
    document.documentElement.style.setProperty('--screen-height', `${screenHeight}px`);
  }
}
