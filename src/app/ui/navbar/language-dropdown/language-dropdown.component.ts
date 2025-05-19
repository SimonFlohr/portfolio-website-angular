import { NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { animate } from 'animejs';

@Component({
  selector: 'app-language-dropdown',
  imports: [NgOptimizedImage],
  templateUrl: './language-dropdown.component.html',
  styleUrl: './language-dropdown.component.css'
})
export class LanguageDropdownComponent implements OnInit {
  currLang: string = localStorage.getItem("language") || "en-US";
  // currLang: string = "nl-NL";
  currLangSelector: string | undefined;
  currLangFlag: string = "";
  isDropdownOpen: boolean = false;

  constructor(
    private el: ElementRef<HTMLElement>
  ) {}

  ngOnInit(): void {
    this.currLangSelector = this.currLang === "en-US" ? " English " : " Nederlands ";
    this.currLangFlag = this.currLang === "en-US" ? "img/us.png" : "img/nl.png";
  }
  
  toggleDropdown(): void {
    const dropdown = this.currLang === "en-US" ? this.el.nativeElement.querySelector("#nl-dropdown") : this.el.nativeElement.querySelector("#en-dropdown");
    
    if (dropdown && !this.isDropdownOpen) {
      dropdown.classList.remove("hidden");
      animate(dropdown, {
        translateY: 40,
        opacity: 1,
        duration: 50,
        ease: "outElastic(.8, .5)"
      });
      this.isDropdownOpen = true;
    } else if (dropdown && this.isDropdownOpen) {
      animate(dropdown, {
        translateY: 0,
        opacity: 0,
        duration: 50,
        ease: "outElastic(.8, .5)"
      });
      setTimeout(() => {
        dropdown?.classList.add("hidden");
      }, 50);
      this.isDropdownOpen = false;
    }
  }

  changeLanguage(language: string): void {
    this.currLang = language;
    localStorage.setItem("language", language);
    window.location.reload();
  }
}