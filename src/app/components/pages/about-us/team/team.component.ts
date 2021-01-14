import { Component, OnInit } from '@angular/core';
import reTeamDE from '../../../../../assets/collections/team.json';
import reTeamEN from '../../../../../assets/collections/team-en.json';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 're-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  team: any[]

  constructor(public translate: TranslateService) {

  }

  ngOnInit(): void {
    this.team = reTeamDE;

    this.translate.onLangChange.subscribe((event) => {
      if (event.lang === 'de') {
        this.team = reTeamDE;
      } else {
        this.team = reTeamEN;
      }
    });

  }

}
