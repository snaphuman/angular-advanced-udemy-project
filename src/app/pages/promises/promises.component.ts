import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsers().then(users => {
      console.log(users);
    });
    // const promise = new Promise( (resolve, reject) => {

    //   if (false) {
    //     resolve("Hello world");
    //   } else {
    //     reject("Something went wrong");
    //   }
    // });

    // promise.then((msg) => {

    //   console.log('Hey im done', msg);
    // })
    // .catch( error => {

    //   console.log('Error in promise', error);
    // })

    // console.log('Init ends');
  }

  getUsers() {

    return new Promise( resolve => {
      fetch('https://reqres.in/api/users')
      .then(res => res.json())
      .then(body => resolve(body.data))
    })
  }

}
