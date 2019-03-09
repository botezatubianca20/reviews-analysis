import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() items: any[] = [];
  constructor(private router: Router) { }

  ngOnInit() {
  }

  verPelicula(item: any) {

    let peliculaId;

    peliculaId = item.id;
    /* let artistaId;
    if (item.type === "album") {
      artistaId = item.id;
    } else {
      artistaId = item.albums[0].id;
    } */

    this.router.navigate(["/movie", peliculaId]);
  }

}
