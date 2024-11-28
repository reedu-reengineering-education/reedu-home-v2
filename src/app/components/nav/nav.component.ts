import { HostListener } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 're-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  currentLang = localStorage.getItem('lang')||this.translate.getBrowserLang()||'de';
  scroll = 0;
  mobileOpen = false;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {}

  selectLang(lang) {

    this.currentLang = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    this.scroll =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
  }

  close() {
    this.mobileOpen = false;
  }
}
