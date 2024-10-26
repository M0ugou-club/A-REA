import { Component, Input } from "@angular/core";

@Component({
  selector: "app-a-reas",
  templateUrl: "./a-reas.component.html",
  styleUrl: "./a-reas.component.scss",
})
export class AReasComponent {
  @Input() areaMainService: string = "";
  @Input() areaSubService: string = "";
  @Input() areaTitle: string = "";
  @Input() serviceColor: string = "";

  getAreaMainServiceImageUrl(url: string): string {
    console.log(url);
    return url.startsWith("icons/") ? url : `/icons/${url}.png`;
  }
}
