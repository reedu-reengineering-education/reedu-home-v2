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

    function wordCloud(selector) {

      var fill = d3.scaleOrdinal(d3Scale.schemeCategory10);
  
      //Construct the word cloud's SVG element
      var svg = d3.select(selector).append("svg")
          .attr("width", 500)
          .attr("height", 500)
          .append("g")
          .attr("transform", "translate(250,250)");
  
  
      //Draw the word cloud
      function draw(words) {
          var cloud = svg.selectAll("g text")
                          .data(words, function(d) { return d.text; })
  
          //Entering words
          cloud.enter()
              .append("text")
              .style("font-family", "Impact")
              .style("fill", function(d, i) { return fill(i); })
              .attr("text-anchor", "middle")
              .attr('font-size', 1)
              .text(function(d) { return d.text; });
  
          //Entering and existing words
          cloud
              .transition()
                  .duration(600)
                  .style("font-size", function(d) { return d.size + "px"; })
                  .attr("transform", function(d) {
                      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                  })
                  .style("fill-opacity", 1);
  
          //Exiting words
          cloud.exit()
              .transition()
                  .duration(200)
                  .style('fill-opacity', 1e-6)
                  .attr('font-size', 1)
                  .remove();
      }
  
  
      //Use the module pattern to encapsulate the visualisation code. We'll
      // expose only the parts that need to be public.
      return {
  
          //Recompute the word cloud for a new set of words. This method will
          // asycnhronously call draw when the layout has been computed.
          //The outside world will need to call this function, so make it part
          // of the wordCloud return value.
          update: function(words) {
              cloud().size([500, 500])
                  .words(words)
                  .padding(5)
                  .rotate(function() { return ~~(Math.random() * 2) * 90; })
                  .font("Impact")
                  .fontSize(function(d) { return d.size; })
                  .on("end", draw)
                  .start();
          }
      }
  
  }
  
  //Some sample data - http://en.wikiquote.org/wiki/Opening_lines
  var words = [
      "You don't know about me without you have read a book called The Adventures of Tom Sawyer but that ain't no matter.",
      "The boy with fair hair lowered himself down the last few feet of rock and began to pick his way toward the lagoon.",
      "When Mr. Bilbo Baggins of Bag End announced that he would shortly be celebrating his eleventy-first birthday with a party of special magnificence, there was much talk and excitement in Hobbiton.",
      "It was inevitable: the scent of bitter almonds always reminded him of the fate of unrequited love."
  ]
  
  //Prepare one of the sample sentences by removing punctuation,
  // creating an array of words and computing a random size attribute.
  function getWords(i) {
      return words[i]
              .replace(/[!\.,:;\?]/g, '')
              .split(' ')
              .map(function(d) {
                  return {text: d, size: 10 + Math.random() * 10};
              })
  }
  
  //This method tells the word cloud to redraw with a new set of words.
  //In reality the new words would probably come from a server request,
  // user input or some other source.
  function showNewWords(vis, i) {
      i = i || 0;
      console.log(words)
      vis.update(getWords(i ++ % words.length))
      setTimeout(function() { showNewWords(vis, i + 1)}, 2000)
  }
  
  //Create a new instance of the word cloud visualisation.
  var myWordCloud = wordCloud('body');
  
  //Start cycling through the demo data
  showNewWords(myWordCloud,0);
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

  wordCloud(selector) {

    var fill = d3.scaleOrdinal(d3Scale.schemeCategory10);

    //Construct the word cloud's SVG element
    var svg = d3.select(selector).append("svg")
        .attr("width", 500)
        .attr("height", 500)
        .append("g")
        .attr("transform", "translate(250,250)");


    //Draw the word cloud
    function draw(words) {
        var cloud = svg.selectAll("g text")
                        .data(words, function(d) { return d.text; })

        //Entering words
        cloud.enter()
            .append("text")
            .style("font-family", "Impact")
            .style("fill", function(d, i) { return fill(i); })
            .attr("text-anchor", "middle")
            .attr('font-size', 1)
            .text(function(d) { return d.text; });

        //Entering and existing words
        cloud
            .transition()
                .duration(600)
                .style("font-size", function(d) { return d.size + "px"; })
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .style("fill-opacity", 1);

        //Exiting words
        cloud.exit()
            .transition()
                .duration(200)
                .style('fill-opacity', 1e-6)
                .attr('font-size', 1)
                .remove();
    }


    //Use the module pattern to encapsulate the visualisation code. We'll
    // expose only the parts that need to be public.
    return {

        //Recompute the word cloud for a new set of words. This method will
        // asycnhronously call draw when the layout has been computed.
        //The outside world will need to call this function, so make it part
        // of the wordCloud return value.
        update: function(words) {
          cloud().size([500, 500])
                .words(words)
                .padding(5)
                .rotate(function() { return ~~(Math.random() * 2) * 90; })
                .font("Impact")
                .fontSize(function(d) { return d.size; })
                .on("end", draw)
                .start();
        }
    }

}

  drawWordCloud(words){
    words = words.flat()
    console.log(words);
    // console.log(d3Scale)
    var fill = d3.scaleOrdinal(d3Scale.schemeCategory10);
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

    // var layout = cloud()
    // .size([1000, 500])
    // .words(finalWords.map(function(d) {
    //   console.log(Math.log(d.count))
    //   return {text: d.text, size: Math.log(d.count+1)*20, test: "haha"};
    // }))
    // .padding(5)
    // // .rotate(function() { return ~~(Math.random() * 2) * 90; })
    // .rotate(function() { return 0; })
    // .font("Brixslab-Regular")
    // .fontSize(function(d) { return d.size; })
    // .on("end", draw);

    var svg = d3.select('#wordcloud-container').append("svg")
    .attr("width", 1000)
    .attr("height", 500)
    .append("g")
    .attr("transform", "translate(500,250)");

    // layout.start();

    function draw(words) {
      var cloud = d3.select("#wordcloud-container").selectAll("g text")
              .data(words, function(d) { return d.text; })
              //Entering words
              cloud.enter()
              .append("text")
              .style("font-family", "Impact")
              .style("fill", function(d, i) { return fill(i); })
              .attr("text-anchor", "middle")
              .attr('font-size', 1)
              .text(function(d) { return d.text; });
  
          //Entering and existing words
          cloud
              .transition()
                  .duration(600)
                  .style("font-size", function(d) { return d.size + "px"; })
                  .attr("transform", function(d) {
                      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                  })
                  .style("fill-opacity", 1);
  
          //Exiting words
          cloud.exit()
              .transition()
                  .duration(200)
                  .style('fill-opacity', 1e-6)
                  .attr('font-size', 1)
                  .remove();
  

      // d3.select("#wordCloud")
      //     .attr("width", layout.size()[0])
      //     .attr("height", layout.size()[1])
      //   .append("g")
      //     .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
      //   .selectAll("text")
      //     .data(words)
      //   .enter().append("text")
      //     .style("font-size", function(d) { return d.size + "px"; })
      //     .style("font-family", "Brixslab-Regular")
      //     .attr("text-anchor", "middle")
      //     .attr("transform", function(d) {
      //       return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      //     })
      //     .text(function(d) { return d.text; });
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
  }


  removeFilter(key){
    this.filter[key] = null;
    this.filterToUrl();
  }
}
