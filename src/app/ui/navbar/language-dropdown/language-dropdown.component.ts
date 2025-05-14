import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';

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

  ngOnInit(): void {
    this.currLangSelector = this.currLang === "en-US" ? " English " : " Nederlands ";
    this.currLangFlag = this.currLang === "en-US" ? "img/us.png" : "img/nl.png";
  }
}