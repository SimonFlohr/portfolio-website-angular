import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MagneticButtonDirective } from '../../../shared/directives/magnetic-button.directive';
import { animate } from 'animejs';

export interface Project {
  title: string,
  shortDescription: string,
  longDescription: string,
  imagePath: string,
  technologies: string[],
  links: {
    github: string,
    live: string,
  }
}

@Component({
  selector: 'app-projects',
  imports: [
    NgOptimizedImage,
    MagneticButtonDirective
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {

  currLanguage: string | null = null;
  projectMap: Map<number, Project> = new Map();
  isProjectExpanded: boolean = false;

  // Project entry: Portfolio Website
  project0: Project = {
    title: "Portfolio Website",
    shortDescription:
      "The website you are currently on. This project serves to showcase my UI/UX and frontend development skills. The emphasis is interactivity, minimalism, and responsiveness.",
    longDescription:
      "The website you are currently on. This project serves to showcase my UI/UX and frontend development skills. The emphasis is interactivity, minimalism, and responsiveness.",
    imagePath: "img/project-0-bg.jpg",
    technologies: ["Angular", "Tailwind CSS", "anime.js", "Git", "Figma", "TypeScript", "HTML", "CSS"],
    links: {
      github: "https://github.com/joshuawong99/portfolio",
      live: "https://joshuawong99.github.io/portfolio/",
    }
  }

  ngOnInit(): void {
    this.currLanguage = localStorage.getItem("language");
    this.addProject(0, this.project0);
  }

  addProject(id: number, project: Project) {
    this.projectMap.set(id, project);
  }

  toggleProjectExpand() {
    const projectExpandContainer = document.getElementById('project-expand-container');

    if (!this.isProjectExpanded) {
      this.isProjectExpanded = !this.isProjectExpanded;
      projectExpandContainer?.classList.toggle('hidden');
      animate(projectExpandContainer!, {
        opacity: 1,
        duration: 150,
        easing: 'easeOutExpo'
      })
    } else if (this.isProjectExpanded) {
      this.isProjectExpanded = !this.isProjectExpanded;
      animate(projectExpandContainer!, {
        opacity: 0,
        duration: 150,
        easing: 'easeOutExpo'
      })
      setTimeout(() => {
        projectExpandContainer?.classList.toggle('hidden');
      }, 150);
    }
  }

}
