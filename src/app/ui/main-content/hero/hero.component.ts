import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { animate } from 'animejs';
import { CommonModule } from '@angular/common';
import { MagneticButtonDirective } from '../../../shared/directives/magnetic-button.directive';

@Component({
  selector: 'app-hero',
  imports: [
    CommonModule,
    MagneticButtonDirective
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  standalone: true
})
export class HeroComponent {
  
}
