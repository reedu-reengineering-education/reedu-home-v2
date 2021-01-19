import { Component, OnInit } from '@angular/core';
import { Tab } from '../../tabs/tabs.component';
import angeboteDe from './../../../../assets/collections/tabs/angebote.json';

@Component({
  selector: 're-angebote',
  templateUrl: './angebote.component.html',
  styleUrls: ['./angebote.component.scss']
})
export class AngeboteComponent implements OnInit {


  angeboteTabs: Tab[]

  constructor() { }

  ngOnInit(): void {
    this.angeboteTabs = angeboteDe as Tab[]
  }

}
