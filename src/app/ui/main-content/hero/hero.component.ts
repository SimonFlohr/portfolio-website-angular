import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MagneticButtonDirective } from '../../../shared/directives/magnetic-button.directive';
import { ProfilePicComponent } from "./profile-pic/profile-pic.component";
import { SocialsComponent } from "./socials/socials.component";

@Component({
  selector: 'app-hero',
  imports: [
    CommonModule,
    MagneticButtonDirective,
    NgOptimizedImage,
    ProfilePicComponent,
    SocialsComponent,
    SocialsComponent
],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  standalone: true
})
export class HeroComponent implements OnInit {

  currLanguage: string | null = null;

  ngOnInit(): void {
    this.currLanguage = localStorage.getItem("language");
  }

  // TODO -> Update resume link to actual resume
  resumeLink: string = "https://drive.google.com/file/d/1JyO4bwQOvopTW4-47_84WMZ-GqlAJLz7/view?usp=sharing";
  
}
