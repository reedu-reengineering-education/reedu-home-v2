import { Component, OnInit } from '@angular/core';
import Typed  from 'typed.js';

@Component({
  selector: 're-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const options = {
      strings: [
      'für Digitale Bildung',
      'für Citizen Science',
      'für Lernmaterialien',
      'für Forschung',
      "für GIS",
      "für Smart Cities",
      "für dich/euch"
      ],
      typeSpeed: 100,
      backSpeed: 50,
      showCursor: false,
      cursorChar: '|',
      loop: true
 };
 
 const typed = new Typed('.typed-element', options);
  }

  onScrollClick() {
    window.scroll({ top: (window.innerHeight - 52), behavior: 'smooth' })
  }




}
