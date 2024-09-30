import { AfterViewInit, Component, OnInit } from "@angular/core";

@Component({
  selector: "app-loginPage",
  templateUrl: "./loginPage.component.html",
  styleUrl: "./loginPage.component.scss",
})

export class LoginPageComponent implements OnInit, AfterViewInit {

  constructor() {}

  ngOnInit() {
    console.log("Before");
  }

  ngAfterViewInit() {
    console.log("After");
  }
}
