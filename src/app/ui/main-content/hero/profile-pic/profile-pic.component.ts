import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-pic',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './profile-pic.component.html',
  styleUrl: './profile-pic.component.css'
})
export class ProfilePicComponent {

}
