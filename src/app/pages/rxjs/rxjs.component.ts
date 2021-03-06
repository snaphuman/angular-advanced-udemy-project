import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { map, retry, take, filter } from 'rxjs/operators';
@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  intervalSubscription: Subscription;

  constructor() {

    this.intervalSubscription = this.interval().subscribe(
      val => console.log(val),
      err => console.error(err),
      () => console.info('Observer finished')
    );

    // this.numberStream().pipe(
    //   retry(2)
    // )
    // .subscribe(
    //   val => console.log('subs:', val),
    //   err => console.warn('there was an error', err),
    //   () => console.info('Observer finished')
    // );
  }

  interval(): Observable<number> {
    return interval(1000)
          .pipe(
            map(value => value + 1),
            filter(value => (value % 2 === 0)),
          );
  }

  ngOnDestroy() {

    this.intervalSubscription.unsubscribe();
  }

  // numberStream(): Observable<number> {
  //   let i = -1;
  //   return new Observable<number> ( observer => {

  //     const interval = setInterval( () => {
  //       i++;
  //       observer.next(i)

  //       if (i === 8) {
  //         observer.error("Error on 8");
  //       }
  //       if (i === 10) {
  //         observer.complete()
  //         clearInterval(interval);
  //       }
  //     }, 1000)
  //   });
  // }

}
