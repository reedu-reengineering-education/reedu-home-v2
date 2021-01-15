import { Component, OnInit } from '@angular/core';
import { Tab } from '../../tabs/tabs.component';
import scienceDe from './../../../../assets/collections/tabs/science.json';


@Component({
  selector: 're-forschung',
  templateUrl: './forschung.component.html',
  styleUrls: ['./forschung.component.scss']
})
export class ForschungComponent implements OnInit {

  scienceTabs: Tab[]

  constructor() { }

  ngOnInit(): void {
    this.scienceTabs = scienceDe as Tab[]
  }

}
