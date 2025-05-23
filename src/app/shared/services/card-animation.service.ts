import { Injectable } from '@angular/core';
import { animate } from 'animejs';

interface CardElements {
  card: HTMLElement;
  cardReflection: HTMLElement;
  cardTitle: HTMLElement;
  cardBgImg: HTMLElement;
  cardOverlayImg?: HTMLElement | null;
}

@Injectable({
  providedIn: 'root'
})
export class CardAnimationService {

  private cardsMap: Map<number, CardElements> = new Map();

  card: HTMLElement | null = null;
  cardReflection: HTMLElement | null = null;
  cardTitle: HTMLElement | null = null;
  cardBgImg: HTMLElement | null = null;
  cardOverlayImg: HTMLElement | null = null;

  constructor() { }

  setCardElements(
    cardId: number,
    card: HTMLElement,
    cardReflection: HTMLElement,
    cardTitle: HTMLElement,
    cardBgImg: HTMLElement,
    cardOverlayImg: HTMLElement | null = null
  ): void {
    this.cardsMap.set(cardId, {
      card,
      cardReflection,
      cardTitle,
      cardBgImg,
      cardOverlayImg
    });
  }

  animateCard(cardId: number, isEntered: boolean): void {
    const elements: any = this.cardsMap.get(cardId);

      animate(elements.card, {
        scale: !isEntered ? 1.01 : 1,
        duration: 100,
        easing: 'easeOutElastic(.8, .5)'
      });
      if (elements.cardOverlayImg) {
        animate(elements.cardOverlayImg!, {
            translateX: !isEntered ? -10 : 0,
          scale: !isEntered ? 1.03 : 1,
          rotate: !isEntered ? -3 : 0,
          duration: 150,
          easing: 'easeOutElastic(.8, .5)'
        });
      }
      animate(elements.cardReflection!, {
        translateX: !isEntered ? -100 : 0,
        scale: !isEntered ? 1.3 : 1,
        duration: 150,
        easing: 'easeOutElastic(.8, .5)'
      });
      animate(elements.cardBgImg!, {
        scale: !isEntered ? 1.05 : 1,
        duration: 150,
        easing: 'easeOutElastic(.8, .5)'
      });
  }
}