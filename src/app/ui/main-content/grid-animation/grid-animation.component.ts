import { Component, ElementRef, AfterViewInit, ViewChild, HostListener, OnDestroy } from '@angular/core';
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

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createGrid();
      this.setupResizeObserver();
      this.isMouseInViewport = true; // Assume mouse starts in viewport
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
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
        
        // Apply minimal styling without borders
        cell.className = 'absolute bg-neutral-800/0';
        
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

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    this.isMouseInViewport = true;
    
    const now = Date.now();
    if (now - this.lastMoveTime < 16) { // Limit to ~60fps
      return;
    }
    this.lastMoveTime = now;
    
    const rect = this.gridContainer.nativeElement.getBoundingClientRect();
    this.mouseX = event.clientX - rect.left;
    this.mouseY = event.clientY - rect.top;
    
    // Use requestAnimationFrame for smoother animation
    if (!this.animationFrame) {
      this.animationFrame = requestAnimationFrame(() => this.updateAnimation());
    }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.isMouseInViewport = true;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.isMouseInViewport = false;
    this.fadeOutActiveCells();
  }
  
  @HostListener('window:mouseout', ['$event'])
  onWindowMouseOut(event: MouseEvent): void {
    // Check if mouse left the document
    if (event.relatedTarget === null) {
      this.isMouseInViewport = false;
      this.fadeOutActiveCells();
    }
  }

  private fadeOutActiveCells(): void {
    if (this.activeSet.size === 0) return;
    
    const activeCellsArray = Array.from(this.activeSet);
    
    // Use Anime.js to create a smooth fade-out effect
    animate(activeCellsArray, {
      backgroundColor: 'rgba(31, 41, 55, 0)',
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
        cell.style.backgroundColor = `rgba(222, 134, 81, ${opacity * 0.2})`;
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
