import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-choice-button",
  templateUrl: "./choice-button.component.html",
  styleUrl: "./choice-button.component.scss",
})
export class ChoiceButtonComponent {
  @Input() choiceLogo: string = "";
  @Input() choiceTitle: string = "";

  @Output() sendChoice: EventEmitter<string> = new EventEmitter();

  choose(): void {
    this.sendChoice.emit(this.choiceTitle);
  }
}
