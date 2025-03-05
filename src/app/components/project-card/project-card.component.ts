import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 're-project-card',
    templateUrl: './project-card.component.html',
    styleUrls: ['./project-card.component.scss'],
    standalone: false
})
export class ProjectCardComponent implements OnInit {

  @Input() project;
  url:any = "";
  constructor() { }

  ngOnInit(): void {
    this.slug();
  }

  slug():void {
    this.url = this.slugify(this.project.name);
  }

  private slugify(str)
  {
      str = str.replace(/^\s+|\s+$/g, '');
  
      // Make the string lowercase
      str = str.toLowerCase();
  
      // Remove accents, swap ñ for n, etc
      var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
      var to   = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
      for (var i=0, l=from.length ; i<l ; i++) {
          str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
      }
  
      // Remove invalid chars
      str = str.replace(/[^a-z0-9 -]/g, '') 
      // Collapse whitespace and replace by -
      .replace(/\s+/g, '-') 
      // Collapse dashes
      .replace(/-+/g, '-'); 
  
      return str;
  }

}
