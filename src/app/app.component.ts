import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 're-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'reedu-home-v2';

  constructor(
    private translate: TranslateService
  ){

  }
  ngOnInit():void{
    const browserLange = this.translate.getBrowserLang();
    this.translate.use(browserLange);
  }
  
}
