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
    //this.team = reTeamDE;
    this.team = this.shuffle(reTeamDE);

    this.translate.onLangChange.subscribe((event) => {
      if (event.lang === 'de') {
        this.team = this.shuffle(reTeamDE);
      } else {
        this.team = this.shuffle(reTeamEN);
      }
    });

  }

   shuffle(team: any[]): any[] {
    return this.team = Array(team.length).fill(null)
       .map((_, i) => [Math.random(), i])
       .sort(([a], [b]) => a - b)
       .map(([, i]) => team[i]);
}
  
}
