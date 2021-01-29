import { Component, OnInit } from '@angular/core';
import awardsDe from '../../../../../assets/collections/awards.json';
import awardsEn from '../../../../../assets/collections/awards-en.json';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 're-auszeichnungen',
  templateUrl: './auszeichnungen.component.html',
  styleUrls: ['./auszeichnungen.component.scss']
})
export class AuszeichnungenComponent implements OnInit {

  awards: any[]


  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
    this.awards = awardsDe;

    this.translate.onLangChange.subscribe((event) => {
      if (event.lang === 'de') {
        this.awards = awardsDe;
      } else {
        this.awards = awardsEn;
      }
    });
  }

}
