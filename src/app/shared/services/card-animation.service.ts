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
  cardBgImg: HTMLElement | null = null;

  constructor() { }

  setVars(
    card: HTMLElement,
    cardReflection: HTMLElement,
    cardTitle: HTMLElement,
    cardBgImg: HTMLElement,
    cardOverlayImg: HTMLElement | null = null
  ): void {
    this.card = card;
    this.cardReflection = cardReflection;
    this.cardOverlayImg = cardOverlayImg;
    this.cardTitle = cardTitle;
    this.cardBgImg = cardBgImg;
  }

  animateCard($event: MouseEvent, isEntered: boolean): void {
      animate(this.card!, {
        scale: !isEntered ? 1.01 : 1,
        duration: 100,
        easing: 'easeOutElastic(.8, .5)'
      });
      if (this.cardOverlayImg) {
        animate(this.cardOverlayImg!, {
            translateX: !isEntered ? -10 : 0,
          scale: !isEntered ? 1.03 : 1,
          rotate: !isEntered ? -3 : 0,
          duration: 150,
          easing: 'easeOutElastic(.8, .5)'
        });
      }
      animate(this.cardReflection!, {
        translateX: !isEntered ? -100 : 0,
        scale: !isEntered ? 1.3 : 1,
        duration: 150,
        easing: 'easeOutElastic(.8, .5)'
      });
      animate(this.cardBgImg!, {
        scale: !isEntered ? 1.05 : 1,
        duration: 150,
        easing: 'easeOutElastic(.8, .5)'
      });
  }
}