import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tab } from '../../tabs/tabs.component';
import angeboteDe from './../../../../assets/collections/tabs/angebote.json';
import angeboteEn from './../../../../assets/collections/tabs/angebote-en.json';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 're-angebote',
  templateUrl: './angebote.component.html',
  styleUrls: ['./angebote.component.scss']
})
export class AngeboteComponent implements OnInit {


  angeboteTabs: Tab[]
  selectedTab;

  constructor(private route: ActivatedRoute, private translate: TranslateService) { }

  ngOnInit(): void {

    if(this.translate.currentLang === 'de' || this.translate.currentLang === undefined){
      this.angeboteTabs = angeboteDe as Tab[]
    } else {
      this.angeboteTabs = angeboteEn as Tab[]
    }

    this.translate.onLangChange.subscribe((event) => {
      if (event.lang === 'de') {
        this.angeboteTabs = angeboteDe as Tab[]
      } else {
        this.angeboteTabs = angeboteEn as Tab[]
      }
    });
    
    this.route.params.subscribe((params) => {
      console.log(params.id);
      this.selectedTab = params.id;
    });
  }

}
