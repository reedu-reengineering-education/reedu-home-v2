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
  filteredProjects: any[];
  customers;
  angebote = ["Software", "Hardware", "Veranstaltungen", "Forschung", "Beratung"];
  topics = [];
  targets = [];
  years = [2018, 2019, 2020]
  filterOpen = false;

  filter = {
    customer: null,
    topic: null,
    angebot: null,
    year: null,
    target: null,
  }


  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    if(this.translate.currentLang === 'de' || this.translate.currentLang === undefined){
      this.projects = reProjectsDE;
    } else {
      this.projects = reProjectsEN;
    }
    this.buildFilters();
    
    this.translate.onLangChange.subscribe((event) => {
      console.log(this.translate.currentLang);
      if (event.lang === 'de') {
        this.projects = reProjectsDE;
      } else {
        this.projects = reProjectsEN;
      }
      this.buildFilters();
    });
    this.filteredProjects = this.projects;
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

  changeCustomer(event){
    if(event == 'null'){
      this.filter.customer = null;
    } else {
      this.filter.customer = event;
    }
  }
  changeTopic(event){
    if(event == 'null'){
      this.filter.topic = null;
    } else {
      this.filter.topic = event;
    }
  }
  toggleAngebot(angebot){
    if(this.filter.angebot != angebot){
      this.filter.angebot = angebot;
    } else {
      this.filter.angebot = null;
    }
  }

  toggleYear(year){
    if(this.filter.year != year){
      this.filter.year = year;
    } else {
      this.filter.year = null;
    }
  }

  toggleTarget(target){
    if(this.filter.target != target){
      this.filter.target = target;
    } else {
      this.filter.target = null;
    }
  }

  toggleFilterModal() {
    this.filterOpen = !this.filterOpen;
  }

  applyFilters() {
    this.filteredProjects = this.projects.filter(project => {
      if(this.filter.customer && this.filter.customer != project.customer) {
        return false;
      }
      if(this.filter.topic && project.topics.indexOf(this.filter.topic) === -1) {
        return false;
      }
      if(this.filter.angebot && project.angebot.indexOf(this.filter.angebot) === -1) {
        return false;
      }
      if(this.filter.year && project.year.indexOf(this.filter.year) === -1) {
        return false;
      }
      if(this.filter.target && project.target.indexOf(this.filter.target) === -1 ) {
        return false;
      }
      return true;

      // if(this.filter.angebote && this.filter.angebote.indexOf())
    })
    this.filterOpen = false;
  }
}
