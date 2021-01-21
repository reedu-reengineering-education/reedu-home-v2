import { Component, OnInit } from '@angular/core';
import reProjectsDE from '../../../../assets/collections/projects/projects.json';
import reProjectsEN from '../../../../assets/collections/projects/projects-en.json';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 're-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  projects: any[];
  customers;
  angebote = ["Software", "Hardware", "Veranstaltungen", "Forschung", "Beratung"];
  topics = [];
  targets = [];
  years = [2018, 2019, 2020]
  filterOpen = false;


  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.projects = reProjectsDE;
    this.buildFilters();
    this.translate.onLangChange.subscribe((event) => {
      if (event.lang === 'de') {
        this.projects = reProjectsDE;
      } else {
        this.projects = reProjectsEN;
      }
      this.buildFilters();
    });
  }

  buildFilters() {
    this.customers = [...new Set(this.projects.map(item => item.customer))]
    this.projects.forEach(item => {
      this.topics.push(...item.topics);
      this.targets.push(...item.target)
    })
    this.topics = [...new Set(this.topics)]
    this.targets = [...new Set(this.targets)]
  }

  toggleFilterModal() {
    this.filterOpen = !this.filterOpen;
  }
}
