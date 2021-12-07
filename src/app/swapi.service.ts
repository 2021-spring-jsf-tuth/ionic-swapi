import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { merge, race, EMPTY, Observable } from "rxjs";
import { expand, tap, repeat, delay, map } from "rxjs/operators";

interface SwapiShapeWeCareAbout {
  next: string;
  results: {
    name: string;
  }[];
}
@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  constructor(private http: HttpClient) { }

  loadPlanets(): Observable<SwapiShapeWeCareAbout> {
    
    //return this.http.get("http://swapi.dev/api/planets/");

    const pageOne = this.http.get<SwapiShapeWeCareAbout>("http://swapi.dev/api/planets/");
    
    // const pageTwo = this.http.get("http://swapi.dev/api/planets/?page=2");

    // return race(
    //   pageOne.pipe(delay(10))
    //   , pageTwo.pipe(delay(50))
    // );

    return pageOne.pipe(
      tap(x => console.log(x))
      , expand(
        x => x.next ? this.http.get<SwapiShapeWeCareAbout>(x.next) : EMPTY
      )
      //, repeat(2)
      //, tap(x => console.log(x))
      , map(x => ({
        next: x.next
        , results: x.results.map(y => ({
          name: y.name
        }))
      }))
      //, tap(x => console.log(x))
    );

  }
}
