import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 're-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  currentLang = 'de';

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
  }

  selectLang(lang){
    this.currentLang = lang;
    this.translate.use(lang);
  }
}
