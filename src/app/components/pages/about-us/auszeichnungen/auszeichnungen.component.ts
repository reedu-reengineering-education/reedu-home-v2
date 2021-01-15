import { Component, OnInit } from '@angular/core';
import awardsDe from '../../../../../assets/collections/awards.json';


@Component({
  selector: 're-auszeichnungen',
  templateUrl: './auszeichnungen.component.html',
  styleUrls: ['./auszeichnungen.component.scss']
})
export class AuszeichnungenComponent implements OnInit {

  awards: any[]


  constructor() { }

  ngOnInit(): void {
    this.awards = awardsDe;
  }

}
