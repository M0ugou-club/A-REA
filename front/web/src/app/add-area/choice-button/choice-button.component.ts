import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-choice-button",
  templateUrl: "./choice-button.component.html",
  styleUrl: "./choice-button.component.scss",
})
export class ChoiceButtonComponent {
  @Input() choiceService: string = "";
  @Input() choiceLogo: string = "";
  @Input() choiceTitle: string = "";
  @Input() serviceColor: string = "";

  @Output() sendChoice: EventEmitter<string> = new EventEmitter();

  isOpen: boolean = false;

  choose(): void {
    this.sendChoice.emit(this.choiceTitle);
  }

  openChoice(): void {
    this.isOpen = !this.isOpen;
  }
}
