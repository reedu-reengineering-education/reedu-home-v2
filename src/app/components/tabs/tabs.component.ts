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
    foerderung?: string[];
    foerderungName?: string;
    logoBottom?: string;
    image: string;
    list1?: string;
    list2?: string;
    list3?: string;
    list4?: string;
    list5?: string;
    list6?: string;
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

  activeTab: Tab | null = null; 
  activeTabIndex: number = 0; 
  
  activeCurrentTab: Tab | null = null;
  activePastTab: Tab | null = null;
  currentProjects: Tab[] = [];
  pastProjects: Tab[] = [];

  constructor(private translate: TranslateService) {}

  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.isResearchPage) {
      if (event.code === "ArrowRight") {
        this.nextTab(false);
      }
      if (event.code === "ArrowLeft") {
        this.previousTab(false);
      }
    } else {
      if (event.code === "ArrowRight") {
        this.nextTabOriginal();
      }
      if (event.code === "ArrowLeft") {
        this.previousTabOriginal();
      }
    }
  }

  ngOnInit(): void {
    if (!this.tabs || this.tabs.length === 0) return;

    if (this.isResearchPage) {
      this.separateProjects();
      
      if (this.currentProjects.length > 0) {
        this.activeCurrentTab = this.currentProjects[0];
      }
      if (this.pastProjects.length > 0) {
        this.activePastTab = this.pastProjects[0];
      }
    } else {
      if (this.selectedTab) {
        this.activeTab = this.tabs.filter(tab => tab.title.toLowerCase() === this.selectedTab.toLowerCase())[0];
        this.activeTabIndex = this.tabs.indexOf(this.activeTab);
      }
      
      if (!this.activeTab) {
        this.activeTab = this.tabs[0];
      }
    }
  }

  ngOnChanges(): void {
    if (!this.tabs || this.tabs.length === 0) return;
    
    if (this.isResearchPage) {
      this.separateProjects();
    } else {
      this.activeTab = this.tabs[this.activeTabIndex];
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
        if (isPastProject) {
            if (index >= 0 && index < this.pastProjects.length) {
                this.activePastTab = this.pastProjects[index];
            }
        } else {
            if (index >= 0 && index < this.currentProjects.length) {
                this.activeCurrentTab = this.currentProjects[index];
            }
        }
    }
  }

  nextTab(isPastProject: boolean = false) {
    if (isPastProject) {
      if (!this.activePastTab || this.pastProjects.length === 0) return;
      
      let currentIndex = this.pastProjects.indexOf(this.activePastTab);
      let nextIndex = (currentIndex + 1) % this.pastProjects.length;
      
      this.activePastTab = this.pastProjects[nextIndex];
    } else {
      if (!this.activeCurrentTab || this.currentProjects.length === 0) return;
      
      let currentIndex = this.currentProjects.indexOf(this.activeCurrentTab);
      let nextIndex = (currentIndex + 1) % this.currentProjects.length;
      
      this.activeCurrentTab = this.currentProjects[nextIndex];
    }
  }

  previousTab(isPastProject: boolean = false) {
    if (isPastProject) {
      if (!this.activePastTab || this.pastProjects.length === 0) return;
      
      let currentIndex = this.pastProjects.indexOf(this.activePastTab);
      let previousIndex = (currentIndex - 1 + this.pastProjects.length) % this.pastProjects.length;
      
      this.activePastTab = this.pastProjects[previousIndex];
    } else {
      if (!this.activeCurrentTab || this.currentProjects.length === 0) return;
      
      let currentIndex = this.currentProjects.indexOf(this.activeCurrentTab);
      let previousIndex = (currentIndex - 1 + this.currentProjects.length) % this.currentProjects.length;
      
      this.activeCurrentTab = this.currentProjects[previousIndex];
    }
  }

  changeTabOriginal(index: number) {
    if (index > this.tabs.length - 1) {
      this.activeTabIndex = 0;
    } else if (index < 0) {
      this.activeTabIndex = this.tabs.length - 1;
    } else {
      this.activeTabIndex = index;
    }
    this.activeTab = this.tabs[this.activeTabIndex];
  }

  previousTabOriginal() {
    this.changeTabOriginal(--this.activeTabIndex);
  }

  nextTabOriginal() {
    this.changeTabOriginal(++this.activeTabIndex);
  }
}