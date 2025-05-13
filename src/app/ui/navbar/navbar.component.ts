import { Component } from '@angular/core';
import { LinksComponent } from './links/links.component';
import { LogoComponent } from './logo/logo.component';
import { MobileToggleComponent } from './mobile-toggle/mobile-toggle.component';
import { ResumeButtonComponent } from './resume-button/resume-button.component';

@Component({
  selector: 'app-navbar',
  imports: [
    LinksComponent,
    LogoComponent,
    MobileToggleComponent,
    ResumeButtonComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
