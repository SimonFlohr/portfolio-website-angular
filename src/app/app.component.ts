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
    this.toggleDarkMode(); // Set initial display mode to dark mode, and save it to local storage
    // Set the background color based on the initial display mode
    switch(localStorage.getItem('isDarkMode')) {
      case 'true':
        document.body.style.backgroundColor = 'var(--neutral-black)';
        break;
      case 'false':
        document.body.style.backgroundColor = 'var(--neutral-white)';
        break;
      default:
        document.body.style.backgroundColor = 'var(--neutral-black)';
        break;
    }
  }

  //  Toggle between dark mode and light mode
  // TODO -> Implement dark mode functionality
  toggleDarkMode(): void {
    this.isDarkMode = true;
    localStorage.setItem('isDarkMode', 'true');
  }

}
