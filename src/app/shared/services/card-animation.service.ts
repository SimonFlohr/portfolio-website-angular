import { Injectable } from '@angular/core';
import { animate } from 'animejs';

@Injectable({
  providedIn: 'root'
})
export class CardAnimationService {

  card: HTMLElement | null = null;
  cardReflection: HTMLElement | null = null;
  cardOverlayImg: HTMLElement | null = null;
  cardTitle: HTMLElement | null = null;
  cardGradient: HTMLElement | null = null;
  cardBgImg: HTMLElement | null = null;

  constructor() { }

  setVars(
    card: HTMLElement,
    cardReflection: HTMLElement,
    cardOverlayImg: HTMLElement | null,
    cardTitle: HTMLElement,
    cardGradient: HTMLElement,
    cardBgImg: HTMLElement
  ): void {
    this.card = card;
    this.cardReflection = cardReflection;
    this.cardOverlayImg = cardOverlayImg;
    this.cardTitle = cardTitle;
    this.cardGradient = cardGradient;
    this.cardBgImg = cardBgImg;
  }

  animateCard($event: MouseEvent, isEntered: boolean): void {
    if (!isEntered) {
      animate(this.card!, {
        scale: 1.01,
        duration: 100,
        easing: 'easeOutElastic(.8, .5)'
      });
      animate(this.cardOverlayImg!, {
        translateX: -10,
        scale: 1.03,
        rotate: -3,
        duration: 150,
        easing: 'easeOutElastic(.8, .5)'
      });
      animate(this.cardReflection!, {
        translateX: -100,
        scale: 1.3,
        duration: 150,
        easing: 'easeOutElastic(.8, .5)'
      });
      animate(this.cardBgImg!, {
        translateX: 0,
        scale: 1.05,
        rotate: 0,
        duration: 150,
        easing: 'easeOutElastic(.8, .5)'
      });
    } else if (isEntered) {
      animate(this.card!, {
        scale: 1,
        duration: 150,
        easing: 'easeOutElastic(.8, .5)'
      });
      animate(this.cardOverlayImg!, {
        translateX: 0,
        scale: 1,
        rotate: 0,
        duration: 150,
        easing: 'easeOutElastic(.8, .5)'
      });
      animate(this.cardReflection!, {
        translateX: 0,
        scale: 1,
        duration: 150,
        easing: 'easeOutElastic(.8, .5)'
      });
      animate(this.cardBgImg!, {
        translateX: 0,
        scale: 1,
        rotate: 0,
        duration: 150,
        easing: 'easeOutElastic(.8, .5)'
      });
    }
  }
}