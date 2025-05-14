import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './ui/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  isDarkMode: boolean | undefined = undefined;

  ngOnInit(): void {
    this.detectBrowserLanguage(); // Detect the user's browser language and set the language accordingly
    this.toggleDarkMode(); // Set initial display mode to dark mode, and save it to local storage
    // Set the background color based on the initial display mode
    switch(localStorage.getItem('isDarkMode')) {
      case 'true':
        document.body.style.backgroundColor = 'var(--neutral-black)';
        document.body.style.color = 'var(--neutral-white';
        break;
      case 'false':
        document.body.style.backgroundColor = 'var(--neutral-white)';
        document.body.style.color = 'var(--neutral-black';
        break;
      default:
        document.body.style.backgroundColor = 'var(--neutral-black)';
        document.body.style.color = 'var(--neutral-white';
        break;
    }
  }

  //  Toggle between dark mode and light mode
  // TODO -> Implement dark mode functionality
  // TODO -> Move dark mode functionality to a service
  toggleDarkMode(): void {
    this.isDarkMode = true;
    localStorage.setItem('isDarkMode', 'true');
  }

  // Detect the user's browser language and set the language accordingly
  // TODO -> Move browser language detection to a service
  detectBrowserLanguage(): void {
    const browserLanguage = navigator.language || (navigator as any).userLanguage;
    
    let language = "en-US";
    if(browserLanguage.startsWith("nl")) {
      language = "nl-NL";
    }

    this.setLanguage(language);
  }

  // Set the language to the given language
  setLanguage(language: string): void {
    localStorage.setItem("language", language);
    // localStorage.setItem("language", "nl-NL");
  }

}
