import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-a-rea',
  templateUrl: './a-rea.component.html',
  styleUrls: ['./a-rea.component.scss']
})
export class AReaComponent {
  @Input() spotifyLogo: string = '';
  @Input() discordLogo: string = '';
  @Input() leftText: string = '';
  @Input() rightText: string = '';
}
