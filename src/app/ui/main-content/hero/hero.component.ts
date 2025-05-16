import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { animate } from 'animejs';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MagneticButtonDirective } from '../../../shared/directives/magnetic-button.directive';

@Component({
  selector: 'app-hero',
  imports: [
    CommonModule,
    MagneticButtonDirective,
    NgOptimizedImage
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  standalone: true
})
export class HeroComponent {

  // TODO -> Update resume link to actual resume
  resumeLink: string = "https://drive.google.com/file/d/1JyO4bwQOvopTW4-47_84WMZ-GqlAJLz7/view?usp=sharing";
  
}
