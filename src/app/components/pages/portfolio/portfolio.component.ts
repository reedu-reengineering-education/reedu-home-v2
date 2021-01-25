import { Component, OnInit } from '@angular/core';
import reProjectsDE from '../../../../assets/collections/projects/projects.json';
import reProjectsEN from '../../../../assets/collections/projects/projects-en.json';
import rePartner from '../../../../assets/collections/partner/partner.json';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  partners = rePartner;

  filter = {
    customer: null,
    topic: null,
    angebot: null,
    year: null,
    target: null,
  }

  appliedFilter = {
    customer: null,
    topic: null,
    angebot: null,
    year: null,
    target: null,
  };


  constructor(private translate: TranslateService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe((queryParams:any) => {
      let params =  queryParams.params;
      for( let param in params){
        this.filter[param] = params[param];
        this.appliedFilter[param] = params[param];
      }
      if(this.projects)
        this.applyFilters();
    })

    if(this.translate.currentLang === 'de' || this.translate.currentLang === undefined){
      this.projects = reProjectsDE;
    } else {
      this.projects = reProjectsEN;
    }
    this.buildFilters();
    
    this.translate.onLangChange.subscribe((event) => {
      if (event.lang === 'de') {
        this.projects = reProjectsDE;
      } else {
        this.projects = reProjectsEN;
      }
      this.buildFilters();
      this.filteredProjects = this.projects;
    });
    this.filteredProjects = this.projects;
    this.applyFilters();

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

  filterToUrl(){
    this.appliedFilter = {...this.filter};
    this.router.navigate([], {queryParams: this.appliedFilter});
  }

  applyFilters() {
    this.filteredProjects = this.projects.filter(project => {
      if(this.appliedFilter.customer && this.appliedFilter.customer != project.customer) {
        return false;
      }
      if(this.appliedFilter.topic && project.topics.indexOf(this.appliedFilter.topic) === -1) {
        return false;
      }
      if(this.appliedFilter.angebot && project.angebote.indexOf(this.appliedFilter.angebot) === -1) {
        return false;
      }
      if(this.appliedFilter.year && project.year.indexOf(parseInt(this.appliedFilter.year)) === -1) {
        return false;
      }
      if(this.appliedFilter.target && project.target.indexOf(this.appliedFilter.target) === -1 ) {
        return false;
      }
      return true;

    })
    this.filterOpen = false;
  }

  removeFilter(key){
    this.filter[key] = null;
    this.filterToUrl();
  }
}
