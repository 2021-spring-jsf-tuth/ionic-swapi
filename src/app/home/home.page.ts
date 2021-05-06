import { Component, OnInit } from '@angular/core';
import { SwapiService } from '../swapi.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private swapi: SwapiService) {}

  planets = [];

  ngOnInit() {
    this.swapi.loadPlanets().subscribe(
      data => {
        console.log(data);

        this.planets = [
          ...this.planets
          , ...(data as any).results
        ].sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1);

      }
      , err => console.error(err)
    );
  }

}
