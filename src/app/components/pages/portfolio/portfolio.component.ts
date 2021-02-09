import { Component, OnInit } from '@angular/core';
import reProjectsDE from '../../../../assets/collections/projects/projects.json';
import reProjectsEN from '../../../../assets/collections/projects/projects-en.json';
import rePartner from '../../../../assets/collections/partner/partner.json';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';


import * as d3 from 'd3';
import * as d3Scale from 'd3';
import * as d3Shape from 'd3';
import * as d3Array from 'd3';
import * as d3Axis from 'd3';
import * as cloud from '../../../../assets/js/d3.layout.cloud.js';

@Component({
  selector: 're-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  projects: any[];
  filteredProjects: any[];
  customers;
  angebote = ["Software", "Hardware", "Veranstaltungen", "Forschung", "Beratung", "Lehrmaterial"];
  topics = [];
  targets = [];
  years = [2018, 2019, 2020, 2021]
  filterOpen = false;

  partners = rePartner;

  cloud;

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

    let that = this;
    
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
      this.applyFilters();
    });
    this.filteredProjects = this.projects;
    this.applyFilters();

  }

  buildFilters() {
    this.topics = [];
    this.targets = [];
    this.customers = [...new Set(this.projects.map(item => item.customer))]
    this.projects.forEach(item => {
      this.topics.push(...item.topics);
      this.targets.push(...item.target)
    })
    this.topics = [...new Set(this.topics)]
    this.targets = [...new Set(this.targets)]

  }

  drawWordCloud(words){
    words = words.flat()
    console.log(words);
    
    var countedWords = {};
    words.forEach(function(word){
      if(countedWords[word]){
        countedWords[word]++;
      } else {
        countedWords[word]= 1;
      }
    })
    console.log(countedWords)
    var finalWords = [];
    for (var word in countedWords){
      finalWords.push({text: word, count: countedWords[word]})
    }
    console.log(finalWords)

    d3.select("#wordCloud").select('g').remove();

    var layout = cloud()
    .size([1000, 500])
    .words(finalWords.map(function(d) {
      console.log(Math.log(d.count))
      return {text: d.text, size: Math.log(d.count+1)*20, test: "haha"};
    }))
    .padding(5)
    // .rotate(function() { return ~~(Math.random() * 2) * 90; })
    .rotate(function() { return 0; })
    .font("Brixslab-Regular")
    .fontSize(function(d) { return d.size; })
    .on("end", draw);

    layout.start();

    function draw(words) {
      d3.select("#wordCloud")
          .attr("width", layout.size()[0])
          .attr("height", layout.size()[1])
        .append("g")
          .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
        .selectAll("text")
          .data(words)
        .enter().append("text")
          .style("font-size", function(d) { return d.size + "px"; })
          .style("font-family", "Brixslab-Regular")
          .attr("text-anchor", "middle")
          .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .text(function(d) { return d.text; });
      }

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
    this.drawWordCloud(this.filteredProjects.map(item => item.topics));
  }

  removeFilter(key){
    this.filter[key] = null;
    this.filterToUrl();
  }
}
