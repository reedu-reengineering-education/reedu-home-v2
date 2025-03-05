 
import { Component, OnInit } from '@angular/core';
import jobs from './../../../../../assets/collections/jobs/jobs.json';
import jobsEn from './../../../../../assets/collections/jobs/jobs-en.json';
 import jobsHead from './../../../../../assets/collections/jobs/jobs-head.json';
import jobsHeadEn from './../../../../../assets/collections/jobs/jobs-head-en.json';

import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 're-jobs',
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.scss'],
    standalone: false
})
export class JobsComponent implements OnInit {

  jobs: any[] = [];
  
  jobsHead: any = {};

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
  
    this.loadData();
    this.translate.onLangChange.subscribe(() => {
      this.loadData();
    });
  }

  loadData(): void {
    
    if (this.translate.currentLang === 'de' || this.translate.currentLang === undefined) {
      this.jobs = jobs;  
       
      this.jobsHead = jobsHead;  
    } else {
      this.jobs = jobsEn; 
      
      this.jobsHead = jobsHeadEn;  
    }
  }
}

