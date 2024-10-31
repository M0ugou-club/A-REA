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
    console.log(url);
    return url.startsWith("icons/") ? url : `/home/${url}.svg`;
  }

  deleteArea() {
    fetch(`${environment.apiUrl}areas/` + this.areaId.toString(), {
      method: "DELETE",
      headers: {
        authorization: "Bearer " + localStorage.getItem("authToken"),
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Erreur de requête:", error);
      });
    window.location.reload();
  }
}
