import { Component } from '@angular/core';
import { LinksComponent } from './links/links.component';
import { LogoComponent } from './logo/logo.component';
import { MobileToggleComponent } from './mobile-toggle/mobile-toggle.component';
import { LanguageDropdownComponent } from './language-dropdown/language-dropdown.component';

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

}
