import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 're-workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.scss']
})
export class WorkshopsComponent implements OnInit {


  constructor(private translate: TranslateService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

  }

  removeFilter(key){
  }
}
