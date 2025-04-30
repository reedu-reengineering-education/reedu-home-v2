import { Component, Input, OnInit } from '@angular/core';
import reTeam from '../../../assets/collections/team.json';

@Component({
  selector: 're-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {
  @Input() project: any;
  contact: any;
  url: string;

  ngOnInit() {
    this.url = this.project.name.toLowerCase().replace(/ /g, '-');
    this.setContact();
  }

  setContact() {
    if (this.project.responsible) {
      this.contact = reTeam.find(person => person.name === this.project.responsible);
    }
  }
}
