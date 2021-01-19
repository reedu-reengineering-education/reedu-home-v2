import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 're-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent implements OnInit {

  @Input() background = false;

  constructor() { }

  ngOnInit(): void {
  }

}
