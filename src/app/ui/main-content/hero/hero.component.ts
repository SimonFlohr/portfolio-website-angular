import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { animate } from 'animejs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  standalone: true
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('resumeButton') resumeButton!: ElementRef;
  @ViewChild('buttonText') buttonText!: ElementRef;
  
  buttonRect: DOMRect | null = null;
  
  ngAfterViewInit() {
    // Initial button dimensions calculation
    this.updateButtonRect();
  }
  
  ngOnDestroy() {
    // No manual cleanup needed with @HostListener
  }
  
  // Listen for window resize events
  @HostListener('window:resize')
  onResize() {
    this.updateButtonRect();
  }
  
  onPointerEnter(event: MouseEvent) {
    // Update button rect before animation to ensure accurate position
    this.updateButtonRect();
    this.animateToPointer(event);
  }
  
  onPointerLeave() {
    // Reset the position of text and button
    animate(this.buttonText.nativeElement, {
      translateX: 0,
      translateY: 0,
      duration: 500,
      easing: 'easeOutElastic(1, .5)'
    });
  }
  
  onPointerMove(event: MouseEvent) {
    this.animateToPointer(event);
  }
  
  private updateButtonRect() {
    if (this.resumeButton?.nativeElement) {
      this.buttonRect = this.resumeButton.nativeElement.getBoundingClientRect();
    }
  }
  
  private animateToPointer(event: MouseEvent) {
    if (!this.buttonRect) {
      this.updateButtonRect();
      if (!this.buttonRect) return;
    }
    
    // Calculate pointer position relative to button center
    const buttonCenterX = this.buttonRect.left + this.buttonRect.width / 2;
    const buttonCenterY = this.buttonRect.top + this.buttonRect.height / 2;
    
    const deltaX = event.clientX - buttonCenterX;
    const deltaY = event.clientY - buttonCenterY;
    
    // Normalize to get a factor between -1 and 1
    const normalizedX = deltaX / (this.buttonRect.width / 2);
    const normalizedY = deltaY / (this.buttonRect.height / 2);
    
    // Text movement (stronger effect)
    animate(this.buttonText.nativeElement, {
      translateX: normalizedX * 8, // 8px max movement
      translateY: normalizedY * 6, // 6px max movement
      duration: 100,
      easing: 'easeInOutQuad'
    });
  }
}
