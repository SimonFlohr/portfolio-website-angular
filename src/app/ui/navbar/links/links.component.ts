import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SubtleLinkAnimationDirective } from '../../../shared/directives/subtle-link-animation.directive';

@Component({
  selector: 'app-links',
  imports: [
    RouterLink,
    SubtleLinkAnimationDirective
  ],
  templateUrl: './links.component.html',
  styleUrl: './links.component.css'
})
export class LinksComponent implements OnInit {
  linkArray: string[] = [];

  ngOnInit(): void {
    if (localStorage.getItem("language") === "nl-NL") {
      this.linkArray = ["Introductie", "Opleidingen", "Projecten", "Contact"];
    } else {
      this.linkArray = ["About", "Education", "Projects", "Contact"];
    }
  }
}
