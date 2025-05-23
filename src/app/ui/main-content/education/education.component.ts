import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CardAnimationService } from '../../../shared/services/card-animation.service';

@Component({
  selector: 'app-education',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent implements OnInit, AfterViewInit {

  currLanguage: string | null = null;

  constructor(private cas: CardAnimationService) { }

  ngOnInit(): void {
    this.currLanguage = localStorage.getItem("language");
  }

  ngAfterViewInit(): void {
      this.cas.setVars(
        document.getElementById('education-card-1')!,
        document.getElementById('education-card-1-reflection-overlay-img')!,
        document.getElementById('education-card-1-text-container')!,
        document.getElementById('education-card-1-bg-img')!,
        document.getElementById('education-card-1-school-building-img')!
      );
  }

  onMouseOver($event: MouseEvent): void {
    this.cas.animateCard($event, false);
  }

  onMouseLeave($event: MouseEvent): void {
    this.cas.animateCard($event, true);
  }

}
