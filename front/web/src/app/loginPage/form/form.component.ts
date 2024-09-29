import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit{
  isSignUp: boolean = false;

  signupUsers: any[] = [];

  signupObj: any = {
    email: '',
    username: '',
    password: ''
  };

  loginObj: any = {
    username: '',
    password: ''
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    const localData = localStorage.getItem('signupUsers');
    if (localData != null) {
      this.signupUsers = JSON.parse(localData);
    }
  }

  onSignUp() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!this.signupObj.email || !this.signupObj.username || !this.signupObj.password) {
      alert('Veuillez remplir tous les champs : email, nom d\'utilisateur et mot de passe.');
      return;
    }

    if (emailRegex.test(this.signupObj.email)) {
      this.signupUsers.push(this.signupObj);
      localStorage.setItem('signupUsers', JSON.stringify(this.signupUsers));
      this.isSignUp = true;
    } else {
      alert('Veuillez entrer une adresse email valide.');
    }
  }

  onLogin() {
    if (!this.loginObj.username || !this.loginObj.password) {
      alert('Veuillez remplir tous les champs : email, nom d\'utilisateur et mot de passe.');
      return;
    }

    const isUserLogin = this.signupUsers.find(user => user.username === this.loginObj.username && user.password === this.loginObj.password)
    if (isUserLogin != undefined) {
      this.router.navigate(['/']);
    } else {
      alert("Wrong username or password");
    }
  }
}
