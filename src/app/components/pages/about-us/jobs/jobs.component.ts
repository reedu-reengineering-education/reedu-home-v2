// import { Component, OnInit } from '@angular/core';
// import jobs from './../../../../../assets/collections/jobs/jobs.json'
// import jobsEn from './../../../../../assets/collections/jobs/jobs-en.json'
// import { TranslateService } from '@ngx-translate/core';

// @Component({
//   selector: 're-jobs',
//   templateUrl: './jobs.component.html',
//   styleUrls: ['./jobs.component.scss']
// })
// export class JobsComponent implements OnInit {

//   jobs: any[]

//   constructor(private translate: TranslateService) { }

//   ngOnInit(): void {
//     this.jobs = jobs

//     if(this.translate.currentLang === 'de' || this.translate.currentLang === undefined){
//       this.jobs = jobs
//     } else {
//       this.jobs = jobsEn;
//     }

//     this.translate.onLangChange.subscribe((event) => {
//       if (event.lang === 'de') {
//         this.jobs = jobs
//       } else {
//         this.jobs = jobsEn;
//       }
//     });
//   }

// }
import { Component, OnInit } from '@angular/core';
import jobs from './../../../../../assets/collections/jobs/jobs.json';
import jobsEn from './../../../../../assets/collections/jobs/jobs-en.json';
import benefits from './../../../../../assets/collections/benefits/benefits-de.json';
import benefitsEn from './../../../../../assets/collections/benefits/benefits-eng.json';
import jobsHead from './../../../../../assets/collections/jobs/jobs-head.json';
import jobsHeadEn from './../../../../../assets/collections/jobs/jobs-head-en.json';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 're-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  jobs: any[] = [];
  benefits: any[] = [];
  jobsHead: any = {};

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    // Load jobs, benefits, and job head based on the current language
    this.loadData();

    // Subscribe to language change events to reload the data
    this.translate.onLangChange.subscribe(() => {
      this.loadData();
    });
  }

  loadData(): void {
    // Load jobs, benefits, and job head based on the current language
    if (this.translate.currentLang === 'de' || this.translate.currentLang === undefined) {
      this.jobs = jobs;  // Load German jobs
      this.benefits = benefits;  // Load German benefits
      this.jobsHead = jobsHead;  // Load German job head
    } else {
      this.jobs = jobsEn;  // Load English jobs
      this.benefits = benefitsEn;  // Load English benefits
      this.jobsHead = jobsHeadEn;  // Load English job head
    }
  }
}

