import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-education',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent implements OnInit {

  currLanguage: string | null = null;

  ngOnInit(): void {
    this.currLanguage = localStorage.getItem("language");
  }

}
