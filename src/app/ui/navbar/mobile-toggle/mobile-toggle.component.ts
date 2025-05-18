import { Component, ElementRef, EventEmitter, Output } from '@angular/core';
import { animate } from 'animejs';

@Component({
  selector: 'app-mobile-toggle',
  imports: [],
  templateUrl: './mobile-toggle.component.html',
  styleUrl: './mobile-toggle.component.css'
})
export class MobileToggleComponent {

  isMenuOpen: boolean = false;
  @Output() menuDataEmitter = new EventEmitter<boolean>();

  constructor(
    private el: ElementRef<HTMLElement>
  ) {}

  toggleMobileMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.emitMenuData();
    if (this.isMenuOpen) {
      this.animateMobileToggle(true);
    } else {
      this.animateMobileToggle(false);
    }
  }

  animateMobileToggle(menuOpen: boolean): void {
    const barOne = this.el.nativeElement.querySelector('#barOne') || this.el.nativeElement.firstElementChild as HTMLElement;
    const barTwo = this.el.nativeElement.querySelector('#barTwo') || this.el.nativeElement.firstElementChild as HTMLElement;
    const barThree = this.el.nativeElement.querySelector('#barThree') || this.el.nativeElement.firstElementChild as HTMLElement;

    animate(barOne, {
      translateY: menuOpen ? '14px' : '0px',
      translateX: menuOpen ? '2px' : '0px',
      rotate: menuOpen ? '-45deg' : '0deg',
      width: menuOpen ? '44px' : '40px',
      duration: 300,
      ease: 'outElastic(1, .8)'
    })

    animate(barThree, {
      translateY: menuOpen ? '-14px' : '0px',
      translateX: menuOpen ? '2px' : '0px',
      rotate: menuOpen ? '45deg' : '0deg',
      width: menuOpen ? '44px' : '40px',
      duration: 300,
      ease: 'outElastic(1, 0.8)'
    })

    animate(barTwo, {
      opacity: menuOpen ? 0 : 1,
      duration: 100,
      easing: 'outQuad'
    })
  }

  emitMenuData(): void {
    this.menuDataEmitter.emit(this.isMenuOpen);
  }

}
