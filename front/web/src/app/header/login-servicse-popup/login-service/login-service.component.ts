import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-login-service",
  templateUrl: "./login-service.component.html",
  styleUrl: "./login-service.component.scss",
})
export class LoginServiceComponent {
  @Input() serviceName: string = "";
  @Input() serviceIcon: string = "";
  @Input() serviceColor: string = "";
  @Input() isConnected: boolean = false;
  @Output() connectToService = new EventEmitter();

  constructor() {}

  connectionService() {
    this.connectToService.emit();
  }
}