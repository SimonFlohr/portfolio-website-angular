import { Component } from '@angular/core';
import { GridAnimationComponent } from './grid-animation/grid-animation.component';
import { HeroComponent } from './hero/hero.component';

@Component({
  selector: 'app-main-content',
  imports: [
    GridAnimationComponent,
    HeroComponent
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent {

}
