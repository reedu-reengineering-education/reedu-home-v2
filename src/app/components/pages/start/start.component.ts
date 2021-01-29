import { Component, enableProdMode, OnInit } from '@angular/core';
import Typed from 'typed.js';
import { TranslateService } from '@ngx-translate/core';
const de = 
[   "für Digitale Bildung",
   "für Citizen Science",
   "für Lernmaterialien",
   "für Forschung",
   "für GIS",
   "für Smart Cities",
   "für dich"]


const en = [
  "Digital Education",
  "Citizen Science",
  "OER",
  "Science",
  "GIS",
  "Smart Cities",
  "you"]


@Component({
  selector: 're-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})

export class StartComponent implements OnInit {

  constructor(private translate:TranslateService) { }

  ngOnInit(): void {
    let typedDe,typedEn;
    let optionsEn = {
      strings:en,
      typeSpeed: 100,
      backSpeed: 50,
      showCursor: false,
      cursorChar: '|',
      loop: true
    };
    let optionsDe = {
      strings:de,
      typeSpeed: 100,
      backSpeed: 50,
      showCursor: false,
      cursorChar: '|',
      loop: true
    };
    if(this.translate.currentLang === 'de' || this.translate.currentLang === undefined){
      typedDe = new Typed('.typed-element', optionsDe);
    } else {
      typedEn = new Typed('.typed-element', optionsEn);
    }
    this.translate.onLangChange.subscribe((event) => {
      if (event.lang === 'de') {
        typedEn.destroy();
        typedDe = new Typed('.typed-element', optionsDe);
      } else {
        typedDe.destroy();
        typedEn = new Typed('.typed-element', optionsEn);
      }
    });


  }

  onScrollClick() {
    window.scroll({ top: (window.innerHeight - 52), behavior: 'smooth' })
  }




}
