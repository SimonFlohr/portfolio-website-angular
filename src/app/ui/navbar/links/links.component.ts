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
  linkArray: string[][] = [];

  ngOnInit(): void {
    if (localStorage.getItem("language") === "nl-NL") {
      // this.linkArray = ["Introductie", "Opleidingen", "Projecten", "Contact"];
      this.linkArray = [["Introductie", "// 127.0.0.1 is waar het hart ligt"], ["Opleidingen", "// opleidingen en cursussen die ik heb gevolgd"], ["Projecten", "// projecten die ik graag met de wereld deel"], ["Contact", "// mijn contactgegevens"]];
    } else {
      this.linkArray = [["About", "// there's no place like 127.0.0.1"], ["Education", "// how I got where I am now"], ["Projects", "// things I like to show off"], ["Contact", "// call me, maybe?"]];
    }
  }
}
