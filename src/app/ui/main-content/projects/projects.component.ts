import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  imports: [
    NgOptimizedImage
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
