import { Component, ElementRef, AfterViewInit, ViewChild, HostListener, OnDestroy, NgZone } from '@angular/core';
import { animate } from 'animejs';

@Component({
  selector: 'app-grid-animation',
  templateUrl: './grid-animation.component.html',
  styleUrls: ['./grid-animation.component.css']
})
export class GridAnimationComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gridContainer') gridContainer!: ElementRef;
  
  private cells: HTMLElement[] = [];
  private cellSize = 40;
  private mouseX = 0;
  private mouseY = 0;
  private radius = 200;
  private animationFrame: number | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private lastMoveTime = 0;
  private cellCache: Map<HTMLElement, { x: number, y: number }> = new Map();
  private activeSet: Set<HTMLElement> = new Set(); // Track active cells
  private isMouseInViewport = false;
  private gridRect: DOMRect | null = null;
  private isMobileDevice = false; // Flag to detect mobile device

  constructor(private ngZone: NgZone) {
    // Detect if we're on a mobile device
    this.isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createGrid();
      this.setupResizeObserver();
      this.isMouseInViewport = true; // Assume mouse starts in viewport
      
      // Add document-level mouse tracking
      this.ngZone.runOutsideAngular(() => {
        document.addEventListener('mousemove', this.handleDocumentMouseMove);
        document.addEventListener('mouseout', this.handleDocumentMouseOut);
        
        // Add touch event listeners for mobile
        if (this.isMobileDevice) {
          this.gridContainer.nativeElement.style.pointerEvents = 'auto'; // Enable touch events
          document.addEventListener('touchstart', this.handleTouchStart);
        }
      });
      
      // Store initial grid boundaries
      this.updateGridRect();
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    
    // Remove document-level event listeners
    document.removeEventListener('mousemove', this.handleDocumentMouseMove);
    document.removeEventListener('mouseout', this.handleDocumentMouseOut);
    
    // Remove touch event listeners
    if (this.isMobileDevice) {
      document.removeEventListener('touchstart', this.handleTouchStart);
    }
  }

  // Add touch event handler
  private handleTouchStart = (event: TouchEvent): void => {
    // Prevent default to avoid scrolling/zooming while interacting with the grid
    event.preventDefault();
    
    if (!this.gridRect) {
      this.updateGridRect();
    }
    
    const touch = event.touches[0];
    // Convert touch coordinates to local grid coordinates
    this.mouseX = touch.clientX - (this.gridRect?.left || 0);
    this.mouseY = touch.clientY - (this.gridRect?.top || 0);
    
    // Trigger ripple animation
    this.createRippleEffect();
  }
  
  // Create a ripple effect from touch point
  private createRippleEffect(): void {
    // Clear any existing active cells
    this.fadeOutActiveCells();
    
    // Start with a small radius and expand
    let currentRadius = 1;
    const maxRadius = this.radius * 1.1; // Make ripple a bit larger than mouse hover
    const duration = 400; // Total animation duration in ms
    const startTime = Date.now();
    
    const expandRipple = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Exponential ease-out function for natural ripple effect
      const easeOutExpo = 1 - Math.pow(1 - progress, 3);
      
      // Calculate current radius based on progress
      currentRadius = 10 + (maxRadius - 10) * easeOutExpo;
      
      // Find and activate cells within the current radius
      const newActiveSet = new Set<HTMLElement>();
      
      this.cells.forEach(cell => {
        const cached = this.cellCache.get(cell);
        if (!cached) return;
        
        const dx = cached.x - this.mouseX;
        const dy = cached.y - this.mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < currentRadius) {
          // Add to active set
          newActiveSet.add(cell);
          
          // Calculate opacity based on distance and time
          // Cells near the edge of the ripple are more visible
          const distanceRatio = distance / currentRadius;
          const edgeFactor = Math.max(0, 1 - Math.abs(0.8 - distanceRatio) * 5);
          const fadeOutFactor = Math.max(0, 1 - progress); // Gradually fade out
          
          const opacity = edgeFactor * fadeOutFactor * 0.4; // Max opacity of 0.4
          
          // cell.style.backgroundColor = `rgba(222, 134, 81, ${opacity})`;
          cell.style.backgroundColor = `rgba(100, 100, 100, ${opacity})`;
        }
      });
      
      // Update the active set
      this.activeSet = newActiveSet;
      
      // Continue animation until complete
      if (progress < 1) {
        requestAnimationFrame(expandRipple);
      } else {
        // Fade out all cells when ripple is complete
        this.fadeOutActiveCells();
      }
    };
    
    // Start the ripple animation
    requestAnimationFrame(expandRipple);
  }

  private updateGridRect(): void {
    this.gridRect = this.gridContainer.nativeElement.getBoundingClientRect();
  }

  private handleDocumentMouseMove = (event: MouseEvent): void => {
    this.isMouseInViewport = true;
    
    const now = Date.now();
    if (now - this.lastMoveTime < 16) { // Limit to ~60fps
      return;
    }
    this.lastMoveTime = now;
    
    if (!this.gridRect) {
      this.updateGridRect();
    }
    
    // Convert global coordinates to local grid coordinates
    this.mouseX = event.clientX - (this.gridRect?.left || 0);
    this.mouseY = event.clientY - (this.gridRect?.top || 0);
    
    // Use requestAnimationFrame for smoother animation
    if (!this.animationFrame) {
      this.animationFrame = requestAnimationFrame(() => this.updateAnimation());
    }
  }

  private handleDocumentMouseOut = (event: MouseEvent): void => {
    // Check if mouse left the document
    if (event.relatedTarget === null) {
      this.isMouseInViewport = false;
      this.fadeOutActiveCells();
    }
  }

  private setupResizeObserver(): void {
    this.resizeObserver = new ResizeObserver(() => {
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
        this.animationFrame = null;
      }
      
      this.gridContainer.nativeElement.innerHTML = '';
      this.cells = [];
      this.cellCache.clear();
      this.activeSet.clear();
      
      this.createGrid();
      // Update the grid boundaries after resize
      this.updateGridRect();
    });
    
    this.resizeObserver.observe(this.gridContainer.nativeElement);
  }

  private createGrid(): void {
    const container = this.gridContainer.nativeElement;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    
    // Calculate number of cells needed (with slight overflow)
    const cols = Math.ceil(containerWidth / this.cellSize) + 1;
    const rows = Math.ceil(containerHeight / this.cellSize) + 1;
    
    // Create a document fragment for better performance
    const fragment = document.createDocumentFragment();
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const cell = document.createElement('div');
        
        // Apply minimal styling without borders - make cells non-interactive
        cell.className = 'absolute bg-neutral-800/0 pointer-events-none';
        cell.style.zIndex = '-1';
        
        // Position and size the cell
        cell.style.width = `${this.cellSize}px`;
        cell.style.height = `${this.cellSize}px`;
        cell.style.left = `${col * this.cellSize}px`;
        cell.style.top = `${row * this.cellSize}px`;
        
        // Pre-calculate and cache cell center position
        const centerX = col * this.cellSize + this.cellSize / 2;
        const centerY = row * this.cellSize + this.cellSize / 2;
        this.cellCache.set(cell, { x: centerX, y: centerY });
        
        fragment.appendChild(cell);
        this.cells.push(cell);
      }
    }
    
    container.appendChild(fragment);
  }

  // Keep these methods for backward compatibility but they're no longer needed
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {}

  @HostListener('mouseenter')
  onMouseEnter(): void {}

  @HostListener('mouseleave')
  onMouseLeave(): void {}
  
  @HostListener('window:mouseout', ['$event'])
  onWindowMouseOut(event: MouseEvent): void {}

  private fadeOutActiveCells(): void {
    if (this.activeSet.size === 0) return;
    
    const activeCellsArray = Array.from(this.activeSet);
    
    // Use Anime.js to create a smooth fade-out effect
    animate(activeCellsArray, {
      backgroundColor: 'rgba(100, 100, 100, 0)',
      easing: 'easeOutQuad',
      duration: 800,
      complete: () => {
        // Clear the active set after animation completes
        this.activeSet.clear();
      }
    });
  }

  private updateAnimation(): void {
    const x = this.mouseX;
    const y = this.mouseY;
    const radius = this.radius;
    
    // First, create a new set of cells that should be active
    const newActiveSet = new Set<HTMLElement>();
    
    // Find currently active cells based on cursor position
    this.cells.forEach(cell => {
      const cached = this.cellCache.get(cell);
      if (!cached) return;
      
      const dx = cached.x - x;
      const dy = cached.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < radius) {
        // Add to active set
        newActiveSet.add(cell);
        
        // Calculate opacity based on distance
        const opacity = Math.max(0, 1 - (distance / radius));
        cell.style.backgroundColor = `rgba(100,100,100, ${opacity * 0.35})`;
      }
    });
    
    // Clear cells that were active but shouldn't be anymore
    this.activeSet.forEach(cell => {
      if (!newActiveSet.has(cell)) {
        cell.style.backgroundColor = 'rgba(222, 134, 81, 0)';
      }
    });
    
    // Update the active set
    this.activeSet = newActiveSet;
    
    this.animationFrame = null;
    
    // Set up the next frame if the mouse is moving or in the viewport
    if (this.isMouseInViewport && Date.now() - this.lastMoveTime < 100) {
      this.animationFrame = requestAnimationFrame(() => this.updateAnimation());
    }
  }
}
