import { Component, OnInit } from '@angular/core';
import awardsDe from '../../../../../assets/collections/awards.json';
import awardsEn from '../../../../../assets/collections/awards-en.json';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 're-auszeichnungen',
    templateUrl: './auszeichnungen.component.html',
    styleUrls: ['./auszeichnungen.component.scss'],
    standalone: false
})
export class AuszeichnungenComponent implements OnInit {

  awards: any[]
  openPanel = -1;


  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
    this.awards = awardsDe;

    if(this.translate.currentLang === 'de' || this.translate.currentLang === undefined){
      this.awards = awardsDe;
    } else {
      this.awards = awardsEn;
    }

    this.translate.onLangChange.subscribe((event) => {
      if (event.lang === 'de') {
        this.awards = awardsDe;
      } else {
        this.awards = awardsEn;
      }
    });
  }

  togglePanel(i){
    if( i === this.openPanel) {
      this.openPanel = -1;
    } else {
      this.openPanel = i;
    }
  }

}
