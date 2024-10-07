import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-a-rea',
  templateUrl: './a-rea.component.html',
  styleUrls: ['./a-rea.component.scss']
})
export class AReaComponent {
  @Input() actionLogo: string = '';
  @Input() reactionLogo: string = '';
  @Input() actionText: string = '';
  @Input() reactionText: string = '';
}
