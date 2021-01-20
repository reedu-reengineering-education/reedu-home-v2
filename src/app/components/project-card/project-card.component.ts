import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 're-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input() project;

  constructor() { }

  ngOnInit(): void {
  }

}
