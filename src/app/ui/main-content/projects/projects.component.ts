import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MagneticButtonDirective } from '../../../shared/directives/magnetic-button.directive';

@Component({
  selector: 'app-projects',
  imports: [
    NgOptimizedImage,
    MagneticButtonDirective
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {

  currLanguage: string | null = null;

  ngOnInit(): void {
    this.currLanguage = localStorage.getItem("language");
  }

}
