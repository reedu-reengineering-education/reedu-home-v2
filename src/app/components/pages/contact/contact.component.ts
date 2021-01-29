import { Component, OnInit } from '@angular/core';

@Component({
  selector: 're-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  style = {
    version: 8,
    sources: {
      'raster-tiles': {
        type: 'raster',
        tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
      },
    },
    layers: [
      {
        id: 'simple-tiles',
        type: 'raster',
        source: 'raster-tiles',
        minzoom: 0,
        maxzoom: 18,
      },
    ],
  }

  constructor() { }

  ngOnInit(): void {
  }

}
