import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 're-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.scss']
})
export class JobItemComponent implements OnInit {

  job;
  routeParamSub;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeParamSub = this.route.params.subscribe((params: Params) => {
      this.job = `./../../../../../assets/collections/jobs/${params.filename}`
      console.log(params.filename)
    });
  }

}
