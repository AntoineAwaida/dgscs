import { Injectable } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';

@Injectable()
export class TitleService {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private title: Title,
  ) {}

  APP_TITLE = 'CS3';

  init() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      switchMap(route => route.data),
      map((data) => {
        if (data.title) {
          return ' | '+data.title;
        }
        else {
            return '';
        }
      })
    )
    .subscribe((pathString) => this.title.setTitle(this.APP_TITLE + pathString));
}


}