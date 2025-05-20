import { Component } from '@angular/core';
import { SubtleLinkAnimationDirective } from '../../../../shared/directives/subtle-link-animation.directive';

@Component({
  selector: 'app-socials',
  imports: [
    SubtleLinkAnimationDirective
  ],
  templateUrl: './socials.component.html',
  styleUrl: './socials.component.css'
})
export class SocialsComponent {

}
