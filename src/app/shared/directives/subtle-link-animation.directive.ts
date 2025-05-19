import { Directive, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { animate } from 'animejs';

@Directive({
  selector: '[appSubtleLinkAnimation]',
  standalone: true
})
export class SubtleLinkAnimationDirective implements AfterViewInit {

  private linkElement: HTMLElement | null = null;

  constructor(
    private el: ElementRef<HTMLElement>
  ) { }

  ngAfterViewInit(): void {
      this.linkElement = this.el.nativeElement.firstElementChild as HTMLElement;

      if(!this.linkElement) {
        console.warn('Magnetic button directive: No text element found within the button');
      }
  }

  @HostListener('pointerenter', ['$event'])
  onPointerEnter(event: MouseEvent): void {
    if (!this.linkElement) return;
    animate(this.linkElement, {
      translateY: -3,
      duration: 100,
      easing: 'easeInOutElastic(.8, .5)'
    });
  }

  @HostListener('pointerleave')
  onPointerLeave(): void {
    if (!this.linkElement) return;
    animate(this.linkElement, {
      translateY: 0,
      duration: 100,
      easing: 'easeInOutElastic(.8, .5)'
    });
  }

}
