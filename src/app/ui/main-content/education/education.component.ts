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

  constructor(
    private cas: CardAnimationService
  ) { }

  ngOnInit(): void {
    this.currLanguage = localStorage.getItem("language");
  }

  ngAfterViewInit(): void {
      this.cas.setCardElements(
        1,
        document.getElementById('education-card-1')!,
        document.getElementById('education-card-1-reflection-overlay-img')!,
        document.getElementById('education-card-1-text-container')!,
        document.getElementById('education-card-1-bg-img')!,
        document.getElementById('education-card-1-school-building-img')!
      );
      this.cas.setCardElements(
        2,
        document.getElementById('education-card-2')!,
        document.getElementById('education-card-2-reflection-overlay-img')!,
        document.getElementById('education-card-2-text-container')!,
        document.getElementById('education-card-2-bg-img')!
      );
      this.cas.setCardElements(
        3,
        document.getElementById('education-card-3')!,
        document.getElementById('education-card-3-reflection-overlay-img')!,
        document.getElementById('education-card-3-text-container')!,
        document.getElementById('education-card-3-bg-img')!
      );
      this.cas.setCardElements(
        4,
        document.getElementById('education-card-4')!,
        document.getElementById('education-card-4-reflection-overlay-img')!,
        document.getElementById('education-card-4-text-container')!,
        document.getElementById('education-card-4-bg-img')!
      );
  }

  onMouseOver(cardNumber: number): void {
    switch (cardNumber) {
      case 1:
        this.cas.animateCard(1, false);
        break;
      case 2:
        this.cas.animateCard(2, false);
        break;
      case 3:
        this.cas.animateCard(3, false);
        break;
      case 4:
        this.cas.animateCard(4, false);
        break;
    }
  }

  onMouseLeave(cardNumber: number): void {
    switch (cardNumber) {
      case 1:
        this.cas.animateCard(1, true);
        break;
      case 2:
        this.cas.animateCard(2, true);
        break;
      case 3:
        this.cas.animateCard(3, true);
        break;
      case 4:
        this.cas.animateCard(4, true);
        break;
    }
  }

}
