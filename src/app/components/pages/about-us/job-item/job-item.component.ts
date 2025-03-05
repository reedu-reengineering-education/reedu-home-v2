 
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import benefitsEn from './../../../../../assets/collections/benefits/benefits-eng.json';
import benefitsDe from './../../../../../assets/collections/benefits/benefits-de.json';

@Component({
    selector: 're-job-item',
    templateUrl: './job-item.component.html',
    styleUrls: ['./job-item.component.scss'],
    standalone: false
})
export class JobItemComponent implements OnInit, OnDestroy {

  job: string;
  benefits: any[];
  private routeParamSub;
  private langChangeSub;

  constructor(private route: ActivatedRoute, private translate: TranslateService) { }

  ngOnInit(): void {
    this.routeParamSub = this.route.params.subscribe((params: Params) => {
      this.job = `./../../../../../assets/collections/jobs/${params.filename}`;
      
    });

    this.loadBenefits();

    this.langChangeSub = this.translate.onLangChange.subscribe(() => {
      this.loadBenefits();
      this.adjustJobFilePath();
    });
  }

  loadBenefits(): void {
    if (this.translate.currentLang === 'de' || this.translate.currentLang === undefined) {
     
      this.benefits = benefitsDe;
    } else {
  
      this.benefits = benefitsEn;
    }
  }

  adjustJobFilePath(): void {
    if (this.translate.currentLang === 'de' || this.translate.currentLang === undefined) {
      if (this.job.includes('-en')) {
        this.job = this.job.replace('-en', '');
        
      }
    } else {
      if (!this.job.includes('-en')) {
        this.job = this.job.replace('.md', '-en.md');
       
      }
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
