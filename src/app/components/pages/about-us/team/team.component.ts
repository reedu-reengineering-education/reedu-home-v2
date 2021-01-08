import { Component, OnInit } from '@angular/core';
import reTeam from '../../../../../assets/collections/team.json';

@Component({
  selector: 're-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  team: any[]

  constructor() {
    this.team = reTeam
  }

  ngOnInit(): void {
  }

}
