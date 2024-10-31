import { Component, Input } from "@angular/core";
import { environment } from "../../../../environment/environment";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
  selector: "app-a-reas",
  templateUrl: "./a-reas.component.html",
  styleUrl: "./a-reas.component.scss",
  animations: [
    trigger("fadeIn", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("300ms", style({ opacity: 1 })),
      ]),
      transition(":leave", [animate("300ms", style({ opacity: 0 }))]),
    ]),
  ],
})
export class AReasComponent {
  @Input() areaMainService: string = "";
  @Input() areaSubService: string = "";
  @Input() areaTitle: string = "";
  @Input() serviceColor: string = "";
  @Input() actionTitle: string = "";
  @Input() reactionTitle: string = "";
  @Input() areaId: number = 0;

  showInfo: boolean = false;

  getAreaMainServiceImageUrl(url: string): string {
    return url.startsWith("icons/") ? url : `/icons/${url}.svg`;
  }

  deleteArea() {
    fetch(`${environment.apiUrl}/areas/` + this.areaId.toString(), {
      method: "DELETE",
      headers: {
        authorization: "Bearer " + localStorage.getItem("authToken"),
      },
    })
      .then((response) => {
        if (response.status === 200) {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Erreur de requête:", error);
      });
  }
}
