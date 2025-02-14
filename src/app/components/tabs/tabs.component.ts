import { Component, Input, HostListener, OnChanges, OnInit } from '@angular/core';

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
  @Input() tabs: Tab[];
  @Input() set selectedTab(inputTab) {
    this.activeTab = this.tabs.filter(tab => tab.title.toLowerCase() === inputTab.toLowerCase())[0]
    this.activeTabIndex = this.tabs.indexOf(this.activeTab);
  }
  
  activeTab: Tab;
  activeTabIndex: number = 0;
  currentProjects: Tab[] = [];
  pastProjects: Tab[] = [];

  constructor() { }

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
    if (!this.activeTab) {
      this.activeTab = this.tabs[0];
    }
    this.separateProjects();
  }

  ngOnChanges() {
    this.activeTab = this.tabs[this.activeTabIndex];
    this.separateProjects();
  }

  separateProjects() {
    const today = new Date();
    
    this.currentProjects = this.tabs.filter(project => {
      if (!project.enddate) return true;
      const endDate = this.parseGermanDate(project.enddate);
      return endDate >= today;
    });

    this.pastProjects = this.tabs.filter(project => {
      if (!project.enddate) return false;
      const endDate = this.parseGermanDate(project.enddate);
      return endDate < today;
    });
  }

  private parseGermanDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('.').map(num => parseInt(num, 10));
    return new Date(year, month - 1, day);
  }

  changeTab(index: number, isPastProject: boolean = false) {
    const projectList = isPastProject ? this.pastProjects : this.currentProjects;
    this.activeTab = projectList[index];
    this.activeTabIndex = this.tabs.indexOf(this.activeTab);
  }

  nextTab() {
	const allProjects = [...this.currentProjects, ...this.pastProjects];
	const currentIndex = allProjects.indexOf(this.activeTab);
	const nextIndex = (currentIndex + 1) % allProjects.length;
	this.activeTab = allProjects[nextIndex];
	this.activeTabIndex = this.tabs.indexOf(this.activeTab);
  }
  
  previousTab() {
	const allProjects = [...this.currentProjects, ...this.pastProjects];
	const currentIndex = allProjects.indexOf(this.activeTab);
	const previousIndex = (currentIndex - 1 + allProjects.length) % allProjects.length;
	this.activeTab = allProjects[previousIndex];
	this.activeTabIndex = this.tabs.indexOf(this.activeTab);
  }
}