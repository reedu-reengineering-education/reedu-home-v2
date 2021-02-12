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
  logo?: string,
  forschungsverbund?: string[],
  foerderung?: string,
  foerderungName?: string,
  logoBottom?: string,
  image: string,
  list1?: string,
  list2?: string,
  list3?: string,
  list4?: string,
  list5?: string,
  underscoreStyle?: "dark" | "red";
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
    if (!this.activeTab)
      this.activeTab = this.tabs[0]
  }

  ngOnChanges() {
    this.activeTab = this.tabs[this.activeTabIndex]
  }

  changeTab(index: number) {
    if (index > this.tabs.length - 1) {
      this.activeTabIndex = 0
    } else if (index < 0) {
      this.activeTabIndex = this.tabs.length - 1
    } else {
      this.activeTabIndex = index
    }
    this.activeTab = this.tabs[this.activeTabIndex]
  }

  previousTab() {
    this.changeTab(--this.activeTabIndex)
  }

  nextTab() {
    this.changeTab(++this.activeTabIndex)
  }
}
