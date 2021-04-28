import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styles: [
  ]
})
export class BreadcrumbComponent implements OnDestroy {

  title: string;
  title$: Subscription;

  constructor( private router: Router) {
    this.title$ = this.routeArguments()
      .subscribe( ({ title })  => {
        this.title = title;
        document.title = title
      })
  }

  ngOnDestroy(): void {
    this.title$.unsubscribe();
  }

  routeArguments() {
    return this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data)
      )
  }
}
