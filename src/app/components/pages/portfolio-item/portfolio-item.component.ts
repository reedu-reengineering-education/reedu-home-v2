import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import reProjectsDE from '../../../../assets/collections/projects/projects.json';
import reProjectsEN from '../../../../assets/collections/projects/projects-en.json';

@Component({
  selector: 're-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.scss']
})
export class PortfolioItemComponent implements OnInit {

  projects = [];
  project;
  routeParamSub;
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.projects = reProjectsDE;
    this.translate.onLangChange.subscribe((event) => {
      if (event.lang === 'de') {
        this.projects = reProjectsDE;
      } else {
        this.projects = reProjectsEN;
      }
    });

    this.routeParamSub = this.route.params.subscribe((params: Params) => {
      this.project = this.projects.filter(pro => pro.name == params.id)[0];
    });
  }

  ngOnDestroy(){
    this.routeParamSub.unsubscribe();
  }

}
