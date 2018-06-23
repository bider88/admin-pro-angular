import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.returnObservable()
    // .pipe(
      // retry(2)
    // )
    .subscribe(
      num => console.log('Suscribe', num),
      err => console.error('Error en el observer', err),
      () => console.log('El observable termino')
    );

   }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La página se va a cerrar');
    this.subscription.unsubscribe();
  }

  returnObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {

      let count = 0;

      const interval = setInterval( () => {

        count += 1;

        const ouptut = {
          value: count
        };

        observer.next( ouptut );

        // if ( count === 3 ) {
        //   clearInterval( interval );
        //   observer.complete();
        // }

        // if ( count === 2 ) {
        //   // clearInterval( interval );
        //   observer.error('Error en el observable');
        // }

      }, 1000);

    }).pipe(
      map( res => res.value),
      filter( (value, index) => {
        if ( (value % 2) === 1 ) {
          return true;
        } else {
          return false;
        }
      }),
      retry(2)
    );
  }

}
