import { Component, Input, HostListener, OnChanges, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface Tab {
    title: string;
    title2?: string;
    description: string;
    end?: string;
    link: string;
    linkText: string;
    link2?: string;
    link2Text?: string;
    logo?: string;
    forschungsverbund?: string[];
    foerderung?: string;
    foerderungName?: string;
    logoBottom?: string;
    image: string;
    list1?: string;
    list2?: string;
    list3?: string;
    list4?: string;
    list5?: string;
    underscoreStyle?: "dark" | "red";
    startdate?: string;
    enddate?: string;
}

@Component({
  selector: 're-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, OnChanges {
  @Input() tabs: Tab[] = [];
  @Input() isResearchPage: boolean = false;
  @Input() selectedTab: string;  

  activeTab: Tab;
  activeTabIndex: number = 0;
  currentProjects: Tab[] = [];
  pastProjects: Tab[] = [];

  constructor(private translate: TranslateService) {}

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.code === "ArrowRight") {
      this.nextTab();
    }
    if (event.code === "ArrowLeft") {
      this.previousTab();
    }
  }

  ngOnInit(): void {
    if (!this.tabs || this.tabs.length === 0) return;
    this.activeTab = this.tabs[0];

    if (this.selectedTab) {
      this.changeTabByTitle(this.selectedTab);
    }

    if (this.isResearchPage) {
      this.separateProjects();
    }
  }

  ngOnChanges(): void {
    if (!this.tabs || this.tabs.length === 0) return;
    this.activeTab = this.tabs[this.activeTabIndex] || this.tabs[0];

    if (this.selectedTab) {
      this.changeTabByTitle(this.selectedTab);
    }

    if (this.isResearchPage) {
      this.separateProjects();
    }
  }

  separateProjects() {
    if (!this.isResearchPage) return;

    const today = new Date();
    this.currentProjects = this.tabs.filter(project => !project.enddate || this.parseGermanDate(project.enddate) >= today);
    this.pastProjects = this.tabs.filter(project => project.enddate && this.parseGermanDate(project.enddate) < today);
  }

  private parseGermanDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('.').map(num => parseInt(num, 10));
    return new Date(year, month - 1, day);
  }

  changeTab(index: number, isPastProject: boolean = false) {
    if (this.isResearchPage) {
        const projectList = isPastProject ? this.pastProjects : this.currentProjects;

        if (index < 0 || index >= projectList.length) {
            return;
        }

        this.activeTab = projectList[index];
        this.activeTabIndex = this.tabs.indexOf(this.activeTab);
    } else {
        if (index >= 0 && index < this.tabs.length) {
            this.activeTab = this.tabs[index];
            this.activeTabIndex = index;
        }
    }
  }

  changeTabByTitle(title: string) {
    const foundTab = this.tabs.find(tab => tab.title.toLowerCase() === title.toLowerCase());
    if (foundTab) {
      this.activeTab = foundTab;
      this.activeTabIndex = this.tabs.indexOf(this.activeTab);
    }
  }

  nextTab() {
    let allProjects = this.isResearchPage ? [...this.currentProjects, ...this.pastProjects] : this.tabs;
    
    if (!this.activeTab || allProjects.length === 0) return;
    
    let currentIndex = allProjects.indexOf(this.activeTab);
    let nextIndex = (currentIndex + 1) % allProjects.length;
    
    this.activeTab = allProjects[nextIndex];
    this.activeTabIndex = this.tabs.indexOf(this.activeTab);
  }

  previousTab() {
    let allProjects = this.isResearchPage ? [...this.currentProjects, ...this.pastProjects] : this.tabs;
    
    if (!this.activeTab || allProjects.length === 0) return;
    
    let currentIndex = allProjects.indexOf(this.activeTab);
    let previousIndex = (currentIndex - 1 + allProjects.length) % allProjects.length;
    
    this.activeTab = allProjects[previousIndex];
    this.activeTabIndex = this.tabs.indexOf(this.activeTab);
  }
}
