import { Injectable } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute, NavigationStart } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';

@Injectable()
export class TitleService {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private title: Title,
  ) {}

  APP_TITLE = 'CS3';
//   SEPARATOR = ' > ';

  init() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
    //   map(route => {
    //       while (route.firstChild) route = route.firstChild;
    //       return route;
    //     }),
      switchMap(route => route.data),
      map((data) => {
        if (data.title) {
          // If a route has a title set (e.g. data: {title: "Foo"}) then we use it
          return ' | '+data.title;
        // } else {
        //   // If not, we do a little magic on the url to create an approximation
        //   return this.router.url.split('/').reduce((acc, frag) => {
        //     if (acc && frag) { acc += this.SEPARATOR; }
        //     return this.router.url.split('/').reduce((acc, frag) => {
        //       if ( acc && frag ) { acc += this.SEPARATOR; }
        //       return acc + TitleService.ucFirst(frag);
        //     });
        //   });
        }
        else {
            return '';
        }
      })
    )
    .subscribe((pathString) => this.title.setTitle(this.APP_TITLE + pathString));
}

// static ucFirst(string) {
//   if ( !string ) { return string; }
//   return string.charAt(0).toUpperCase() + string.slice(1);
// }
}