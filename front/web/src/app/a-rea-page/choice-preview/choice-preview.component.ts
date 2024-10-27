import { Component, Input } from "@angular/core";

@Component({
  selector: "app-choice-preview",
  templateUrl: "./choice-preview.component.html",
  styleUrl: "./choice-preview.component.scss",
})
export class ChoicePreviewComponent {
  @Input() choiceService: string = "";
  @Input() choiceTitle: string = "";
  @Input() serviceColor: string = "";
}
