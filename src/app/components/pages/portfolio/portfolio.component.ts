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

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.projects = reProjectsDE;

    this.translate.onLangChange.subscribe((event) => {
      if (event.lang === 'de') {
        this.projects = reProjectsDE;
      } else {
        this.projects = reProjectsEN;
      }
    });
  }
}
