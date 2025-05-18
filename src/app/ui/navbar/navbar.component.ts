import { Component, ElementRef } from '@angular/core';
import { LinksComponent } from './links/links.component';
import { LogoComponent } from './logo/logo.component';
import { MobileToggleComponent } from './mobile-toggle/mobile-toggle.component';
import { LanguageDropdownComponent } from './language-dropdown/language-dropdown.component';
import { animate } from 'animejs';

@Component({
  selector: 'app-navbar',
  imports: [
    LinksComponent,
    LogoComponent,
    MobileToggleComponent,
    LanguageDropdownComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isMenuOpen: boolean = false;

  constructor(
    private el: ElementRef<HTMLElement>
  ) {}

  handleMenuData(menuOpen: boolean): void {
    this.isMenuOpen = menuOpen;
    console.log(this.isMenuOpen);
    this.animateOnMenuStateChange(menuOpen);
  }

  animateOnMenuStateChange(menuOpen: boolean): void {
    const mobileNavbar = this.el.nativeElement.querySelector('#mobile-navbar') || this.el.nativeElement.firstElementChild as HTMLElement;
    
    if (menuOpen) {
      animate(mobileNavbar, {
        translateX: -1030,
        duration: 200,
        easing: 'outElastic(1, .8)'
      })
    } else {
      animate(mobileNavbar, {
        translateX: 1030,
        duration: 800,
        easing: 'outElastic(1, .8)'
      })
    }
  }

}
