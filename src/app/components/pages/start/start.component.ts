import { Component, OnInit } from '@angular/core';

@Component({
  selector: 're-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onScrollClick() {
    window.scroll({ top: (window.innerHeight - 52), behavior: 'smooth' })
  }

}
