import { Component, OnInit } from '@angular/core';
import { Tab } from '../../tabs/tabs.component';
import scienceDe from './../../../../assets/collections/tabs/science.json';
import scienceEn from './../../../../assets/collections/tabs/science-en.json';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 're-forschung',
    templateUrl: './forschung.component.html',
    styleUrls: ['./forschung.component.scss'],
    standalone: false
})
export class ForschungComponent implements OnInit {

  scienceTabs: Tab[]

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.scienceTabs = scienceDe as Tab[];

    if(this.translate.currentLang === 'de' || this.translate.currentLang === undefined){
      this.scienceTabs = scienceDe as Tab[];
    } else {
      this.scienceTabs = scienceEn as Tab[];
    }

    this.translate.onLangChange.subscribe((event) => {
      if (event.lang === 'de') {
        this.scienceTabs = scienceDe as Tab[];
      } else {
        this.scienceTabs = scienceEn as Tab[];
      }
    });
  }
}
