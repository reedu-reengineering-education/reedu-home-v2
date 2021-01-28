import { Component, HostListener, Input, OnInit } from '@angular/core';

export interface Tab {
  title: string;
  title2: string;
  description: string;
  link: string;
  linkText: string;
  image: string,
  underscoreStyle: "dark" | "red";
}

@Component({
  selector: 're-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Input() tabs: Tab[]

  activeTab: Tab
  activeTabIndex: number

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
    this.activeTabIndex = 0;
    this.activeTab = this.tabs[0]
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
