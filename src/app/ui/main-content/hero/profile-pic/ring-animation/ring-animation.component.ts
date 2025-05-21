import { Component, AfterViewInit } from '@angular/core';
import { animate } from 'animejs';

@Component({
  selector: 'app-ring-animation',
  imports: [],
  templateUrl: './ring-animation.component.html',
  styleUrl: './ring-animation.component.css'
})
export class RingAnimationComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.animateRing();
  }

  animateRing() {
    this.setTransformOrigin(document.getElementById('circleOne')!);
    this.setTransformOrigin(document.getElementById('circleTwo')!);
    this.setTransformOrigin(document.getElementById('circleThree')!);


    animate('#circleOne', {
      rotate: '360deg',
      ease: 'linear',
      loop: true,
      duration: 100000,
    });

    animate('#circleTwo', {
      rotate: '360deg',
      ease: 'linear',
      loop: true,
      duration: 60000,
    });

    animate('#circleThree', {
      rotate: '360deg',
      ease: 'linear',
      loop: true,
      duration: 60000,
    });
  }

  setTransformOrigin(element: HTMLElement) {
    element.style.transformOrigin = 'center center';
  }
}
