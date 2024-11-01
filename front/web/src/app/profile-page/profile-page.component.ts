import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { environment } from "../../../environment/environment";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})

export class ProfilePageComponent {
  @ViewChild('oldPasswordInput') oldPasswordInput!: ElementRef;
  @ViewChild('newPasswordInput') newPasswordInput!: ElementRef;

  constructor(private router: Router, private toastr: ToastrService) {}
  userName: string = "";
  userSurname: string = "";
  userEmail: string = "";
  userImage: string = "";

  changeMDPObj = {
    oldPassword: '',
    newPassword: ''
  };

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    fetch(`${environment.apiUrl}/users`, {
      method: "GET",
      headers: {
        authorization: "Bearer " + localStorage.getItem("authToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        this.userName = data.name;
        this.userEmail = data.email;
        this.userSurname = data.surname;
        this.userImage = data.image;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  changeMDP() {
    fetch(`${environment.apiUrl}/password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("authToken")
      },
      body: JSON.stringify(this.changeMDPObj),
    })
      .then((response) => {
        this.changeMDPObj.oldPassword = '';
        this.changeMDPObj.newPassword = '';
        if (response.status === 404) {
          this.setInputBorderColor('red', 'all');
          this.toastr.error('Tu n\'es pas connecté!');
          alert("User not found");
          return null;
        } else if (response.status === 401) {
          this.setInputBorderColor('red', 'oldPassword');
          this.toastr.error('Ton ancien mot de passe est incorrect!');
          return null;
        } else if (response.status === 200) {
          this.setInputBorderColor('green', 'all');
          this.toastr.success('Ton mot de passe a été changé avec succès!');
        }
        return null;
      })
      .catch((error) => {
        console.error("Erreur de réseau:", error);
      });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ['image/png', 'image/jpeg', 'image/svg+xml'];
      if (!validTypes.includes(file.type)) {
        this.toastr.error('Seuls les fichiers .png, .jpeg et .svg sont autorisés.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userImage = e.target.result;
        this.updateProfileImage();
      };
      reader.readAsDataURL(file);
    }
  }

  updateProfileImage() {
    const token = localStorage.getItem("authToken");
    if (!token) {
      this.toastr.error('Token manquant');
      return;
    }

    fetch(`${environment.apiUrl}/users`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify({ image: this.userImage }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        this.toastr.success('Image de profil mise à jour avec succès');
      })
      .catch((error) => {
        console.error("Error:", error);
        this.toastr.error('Erreur lors de la mise à jour de l\'image de profil');
      });
  }
  
  private setInputBorderColor(color: string, type: string): void {
    if (type == "oldPassword") {
      this.oldPasswordInput.nativeElement.style.borderColor = color;
    } else if (type == "newPassword") {
      this.newPasswordInput.nativeElement.style.borderColor = color;
    } else {
      this.oldPasswordInput.nativeElement.style.borderColor = color;
      this.newPasswordInput.nativeElement.style.borderColor = color;
    }
  }
}