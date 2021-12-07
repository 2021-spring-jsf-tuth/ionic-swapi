import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { merge, race, EMPTY } from "rxjs";
import { expand, tap, repeat, delay } from "rxjs/operators";

interface SwapiShapeWeCareAbout {
  next: string;
  results: object[];
}
@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  constructor(private http: HttpClient) { }

  loadPlanets() {
    
    //return this.http.get("http://swapi.dev/api/planets/");

    const pageOne = this.http.get<SwapiShapeWeCareAbout>("http://swapi.dev/api/planets/");
    
    // const pageTwo = this.http.get("http://swapi.dev/api/planets/?page=2");

    // return race(
    //   pageOne.pipe(delay(10))
    //   , pageTwo.pipe(delay(50))
    // );

    return pageOne.pipe(
      tap(x => console.log("tap", x))
      , expand(
        x => x.next ? this.http.get(x.next) : EMPTY
      )
      //, repeat(2)
    );

  }
}
