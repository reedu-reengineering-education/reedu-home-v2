import { Component, OnInit } from '@angular/core';
import jobs from './../../../../../assets/collections/jobs/jobs.json'
import jobsEn from './../../../../../assets/collections/jobs/jobs-en.json'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 're-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  jobs: any[]

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.jobs = jobs

    if(this.translate.currentLang === 'de' || this.translate.currentLang === undefined){
      this.jobs = jobs
    } else {
      this.jobs = jobsEn;
    }
    
    this.translate.onLangChange.subscribe((event) => {
      if (event.lang === 'de') {
        this.jobs = jobs
      } else {
        this.jobs = jobsEn;
      }
    });
  }

}
