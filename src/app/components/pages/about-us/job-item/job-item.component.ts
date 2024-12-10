// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Params } from '@angular/router';

// @Component({
//   selector: 're-job-item',
//   templateUrl: './job-item.component.html',
//   styleUrls: ['./job-item.component.scss']
// })
// export class JobItemComponent implements OnInit {

//   job;
//   routeParamSub;

//   constructor(private route: ActivatedRoute) { }

//   ngOnInit(): void {
//     this.routeParamSub = this.route.params.subscribe((params: Params) => {
//       this.job = `./../../../../../assets/collections/jobs/${params.filename}`
//       console.log(params.filename)
//     });
//   }

// }

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import benefitsEn from './../../../../../assets/collections/benefits/benefits-eng.json';
import benefitsDe from './../../../../../assets/collections/benefits/benefits-de.json';

@Component({
  selector: 're-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.scss']
})
export class JobItemComponent implements OnInit, OnDestroy {

  job;
  benefits: any[];
  routeParamSub;
  langChangeSub;

  constructor(private route: ActivatedRoute, private translate: TranslateService) { }

  ngOnInit(): void {
    this.routeParamSub = this.route.params.subscribe((params: Params) => {
      this.job = `./../../../../../assets/collections/jobs/${params.filename}`;
      console.log(params.filename);
    });

    this.loadBenefits();

    this.langChangeSub = this.translate.onLangChange.subscribe(() => {
      this.loadBenefits();
    });
  }

  loadBenefits(): void {
    if (this.translate.currentLang === 'de' || this.translate.currentLang === undefined) {
      this.benefits = benefitsDe;
    } else {
      this.benefits = benefitsEn;
    }
  }

  ngOnDestroy(): void {
    if (this.routeParamSub) {
      this.routeParamSub.unsubscribe();
    }
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
    }
  }
}

