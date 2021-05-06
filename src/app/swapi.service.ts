import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { merge, race, EMPTY } from "rxjs";
import { expand, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  constructor(private http: HttpClient) { }

  loadPlanets() {
    
    //return this.http.get("http://swapi.dev/api/planets/");

    const pageOne = this.http.get("http://swapi.dev/api/planets/");
    
    //const pageTwo = this.http.get("http://swapi.dev/api/planets/?page=2");

    // return race(
    //   pageOne
    //   , pageTwo
    // );

    return pageOne.pipe(
      tap(x => console.log("tap", x))
      , expand(
        x => (x as any).next ? this.http.get((x as any).next) : EMPTY
      )
    );

  }
}
