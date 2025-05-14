import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnDestroy, Renderer2 } from '@angular/core';
import { animate } from 'animejs';

@Directive({
  selector: '[appMagneticButton]',
  standalone: true,
})
export class MagneticButtonDirective implements AfterViewInit, OnDestroy {
  @Input() magneticStrengthX = 8; // Default max X movement in pixels
  @Input() magneticStrengthY = 6; // Default max Y movement in pixels
  @Input() animationDuration = 100; // Animation duration in ms
  @Input() resetDuration = 500; // Reset animation duration in ms
  
  private buttonRect: DOMRect | null = null;
  private textElement: HTMLElement | null = null;
  
  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}
  
  ngAfterViewInit(): void {
    // Find the text element - either a span with class, or the first child
    this.textElement = this.el.nativeElement.querySelector('.button-text') || 
                       this.el.nativeElement.firstElementChild as HTMLElement;
    
    if (!this.textElement) {
      console.warn('Magnetic button directive: No text element found within the button');
    }
    
    // Initial button dimensions calculation
    this.updateButtonRect();
  }
  
  ngOnDestroy(): void {
    // No manual cleanup needed
  }
  
  @HostListener('window:resize')
  onResize(): void {
    this.updateButtonRect();
  }
  
  @HostListener('pointerenter', ['$event'])
  onPointerEnter(event: MouseEvent): void {
    this.updateButtonRect();
    this.animateToPointer(event);
  }
  
  @HostListener('pointermove', ['$event'])
  onPointerMove(event: MouseEvent): void {
    this.animateToPointer(event);
  }
  
  @HostListener('pointerleave')
  onPointerLeave(): void {
    if (!this.textElement) return;
    
    // Reset the position of text
    animate(this.textElement, {
      translateX: 0,
      translateY: 0,
      duration: this.resetDuration,
      easing: 'easeOutElastic(1, .5)'
    });
  }
  
  private updateButtonRect(): void {
    if (this.el?.nativeElement) {
      this.buttonRect = this.el.nativeElement.getBoundingClientRect();
    }
  }
  
  private animateToPointer(event: MouseEvent): void {
    if (!this.buttonRect || !this.textElement) {
      this.updateButtonRect();
      if (!this.buttonRect || !this.textElement) return;
    }
    
    // Calculate pointer position relative to button center
    const buttonCenterX = this.buttonRect.left + this.buttonRect.width / 2;
    const buttonCenterY = this.buttonRect.top + this.buttonRect.height / 2;
    
    const deltaX = event.clientX - buttonCenterX;
    const deltaY = event.clientY - buttonCenterY;
    
    // Normalize to get a factor between -1 and 1
    const normalizedX = deltaX / (this.buttonRect.width / 2);
    const normalizedY = deltaY / (this.buttonRect.height / 2);
    
    // Text movement
    animate(this.textElement, {
      translateX: normalizedX * this.magneticStrengthX,
      translateY: normalizedY * this.magneticStrengthY,
      duration: this.animationDuration,
      easing: 'easeInOutQuad'
    });
  }
}
