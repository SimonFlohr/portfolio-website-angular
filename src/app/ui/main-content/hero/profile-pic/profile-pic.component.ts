import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RingAnimationComponent } from './ring-animation/ring-animation.component';

@Component({
  selector: 'app-profile-pic',
  imports: [
    NgOptimizedImage,
    RingAnimationComponent
  ],
  templateUrl: './profile-pic.component.html',
  styleUrl: './profile-pic.component.css'
})
export class ProfilePicComponent {

}
