import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  constructor() {
    this.numberStream().pipe(
      retry(2)
    )
    .subscribe(
      val => console.log('subs:', val),
      err => console.warn('there was an error', err),
      () => console.info('Observer finished')
    );
  }

  numberStream(): Observable<number> {
    let i = -1;
    return new Observable<number> ( observer => {

      const interval = setInterval( () => {
        i++;
        observer.next(i)

        if (i === 8) {
          observer.error("Error on 8");
        }
        if (i === 10) {
          observer.complete()
          clearInterval(interval);
        }
      }, 1000)
    });
  }

}
