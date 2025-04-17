import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import reProjectsDE from '../../../../assets/collections/projects/projects.json';
import reProjectsEN from '../../../../assets/collections/projects/projects-en.json';
import reTeamDE from '../../../../assets/collections/team.json';
import reTeamEN from '../../../../assets/collections/team-en.json';

@Component({
  selector: 're-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.scss'],
  standalone: false
})
export class PortfolioItemComponent implements OnInit {

  projects = [];
  project;
  routeParamSub;
  team = [];
  responsiblePerson;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService) { }

  ngOnInit(): void {
    if (this.translate.currentLang === 'de') {
      this.projects = reProjectsDE;
      this.team = reTeamDE;
    } else {
      this.projects = reProjectsEN;
      this.team = reTeamEN;
    }

    this.translate.onLangChange.subscribe((event) => {
      if (event.lang === 'de') {
        this.projects = reProjectsDE;
        this.team = reTeamDE;
      } else {
        this.projects = reProjectsEN;
        this.team = reTeamEN;
      }
    });

    this.routeParamSub = this.route.params.subscribe((params: Params) => {
      this.project = this.projects.filter(pro => this.slugify(pro.name) == params.id)[0];
      if (this.project) {
        this.responsiblePerson = this.team.find(member => member.name === this.project.responsible);
      }
    });
  }

  private slugify(str) {
    str = str.replace(/^\s+|\s+$/g, '');

    // Make the string lowercase
    str = str.toLowerCase();

    // Remove accents, swap ñ for n, etc
    var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
    var to = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    // Remove invalid chars
    str = str.replace(/[^a-z0-9 -]/g, '')
      // Collapse whitespace and replace by -
      .replace(/\s+/g, '-')
      // Collapse dashes
      .replace(/-+/g, '-');

    return str;
  }

  ngOnDestroy() {
    this.routeParamSub.unsubscribe();
  }
}
