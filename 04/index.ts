
import {Observable, of, from, fromEvent, concat, interval, timer} from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { allBooks, allReaders } from './data';

//#region Creating Observables

// let allBooksObservable$ = Observable.create(subscriber => {

//   if (document.title !== 'RxBookTracker') {
//     subscriber.error('Incorrect page title.');
//   }

//   for (let book of allBooks) {
//     subscriber.next(book);
//   }

//   setTimeout(() => {
//     subscriber.complete();
//   }, 2000);

//   return () => console.log('Executing teardown code.');
  
// });

// allBooksObservable$.subscribe(book => console.log(book.title));


// let source1$ = of('hello', 10, true, allReaders[0].name);

// //source1$.subscribe(value => console.log(value));

// let source2$ = from(allBooks);

// //source2$.subscribe(book => console.log(book.title));

// concat(source1$, source2$)
//   .subscribe(value => console.log(value));


// let button = document.getElementById('readersButton');

// fromEvent(button, 'click')
//   .subscribe(event => {
//     console.log(event);

//     let readersDiv = document.getElementById('readers');


 //     for (let reader of allReaders) {
 //       readersDiv.innerHTML += reader.name + '<br>';
 //     }
 //   });

 // let button = document.getElementById('readersButton');

 // fromEvent(button, 'click')
 //   .subscribe(event => {
 //     ajax('/api/readers')
 //       .subscribe(ajaxResponse => {
 //         console.log(ajaxResponse);
 //         let readers = ajaxResponse.response;

//         let readersDiv = document.getElementById('readers');

//         for (let reader of readers) {
//           readersDiv.innerHTML += reader.name + '<br>';
//         }

//       });
//   });

//#endregion

//#region subscription to Observables with Observers

 //let books$= from(allBooks);

 // BOTH below are correct choose what you are Ok with it

//  let bookObserver={
//      //  all of the functions all optional you can delete every one you want!
//      next: book=> console.log(`Title:${book.title}`),
//      error: err=> console.log(`Error:${err}`),
//      complete: ()=> console.log(`All Done!`),
//  }
// books$.subscribe(bookObserver);
//
// books$.subscribe(
//         book=> console.log(`Title:${book.title}`),
//         err=> console.log(`Error:${err}`),
//         ()=> console.log(`All Done!`),
// );

//////////////////////////////////////////////////////////////

// here we are going to have 3subscribes on one observable

// let currentTime$=new Observable(subscriber=>{
//     const timeString=new Date().toLocaleTimeString();
//     subscriber.next(timeString);
//     subscriber.complete();
// });
//
// currentTime$.subscribe(
//     currentTime=>console.log(`Observable 1 : ${currentTime}`)
// );
//
// setTimeout(()=>{
//     currentTime$.subscribe(
//         currentTime=>console.log(`Observable 2: ${currentTime}`)
//     );
// },1000);
// setTimeout(()=>{
//     currentTime$.subscribe(
//         currentTime=>console.log(`Observable 3: ${currentTime}`)
//     );
// },2000);

//////////////////////////////////////////////////////////////

let timeDiv=document.getElementById('times');
let button=document.getElementById('timerButton');

let timer$=interval(1000);

// Add time to DIV
let timerSubscription=timer$.subscribe(
    value => timeDiv.innerHTML+=`${new Date().toLocaleTimeString()} (${value}) <br>`,
    null, // no need to error and this is optional
    ()=> console.log(`All Done!`)
);

// Add time to console log
/**
 * by this line: timerSubscription.add(timerConsoleSubscription);
 * we bind these two subscriber together, when we do unsubscribe
 * in fromEvent this would affect both of them, because they add
 * to each other.
 */
//
let timerConsoleSubscription=timer$.subscribe(
    value => console.log(`${new Date().toLocaleTimeString()} (${value})`),

);
timerSubscription.add(timerConsoleSubscription);

// Stop
fromEvent(button,'click')
    .subscribe(
        // When you unsubscribe from an Observable you won't get any complete message!
        event=>timerSubscription.unsubscribe()
    );


//endregion

