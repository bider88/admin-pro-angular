import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() {

    this.countThree().then(
      res => console.log('Promesa con éxito', res)
    )
    .catch( err => console.log('Error en la promesa', err) );

   }

  ngOnInit() {
  }

  countThree(): Promise<boolean> {
    return new Promise((resolve, reject) => {

      let count = 0;

      const interval = setInterval( () => {

        count += 1;

        console.log(count);

        if ( count === 3 ) {
          resolve(true);
          clearInterval(interval);
        }

      }, 1000);

    });
  }

}
