import { Component, OnInit } from '@angular/core';
import jobs from './../../../../../assets/collections/jobs/jobs.json'

@Component({
  selector: 're-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  jobs: any[]

  constructor() { }

  ngOnInit(): void {
    this.jobs = jobs
  }

}
