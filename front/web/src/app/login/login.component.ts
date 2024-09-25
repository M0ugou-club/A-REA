import { AfterViewInit, Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit() {
    console.log("bite");
  }

  ngAfterViewInit() {
    console.log("After");
  }
}
