import {Observable,of, from, concat, fromEvent} from 'rxjs';
import {allBooks, allReaders} from './data';
import {ajax} from 'rxjs/ajax';


/**
 * Observable From Scrach
 */
// let allBooksObservable$ =  Observable.create(subscriber=>{
//     if (document.title !=='RxJS') {
//         subscriber.error('Incorect Doc!')
//     }

//     for (let book of allBooks) {
//         subscriber.next(book);
//     }

//     setTimeout(() => {
//         subscriber.complete();
//     }, 2000);

//     return ()=>console.log('Code execution!');
    
// });
// allBooksObservable$.subscribe(book => console.log(book.title));

////////////////////////////////////////////////////////////////////////////////

/**
 * JUST PASS what you want to observable to produce to the OF function !
 */
 
//let source1$=of('test',10,allReaders[0].name);
// source$.subscribe((val)=> console.log(val));

/////////////////////////////////////////////////////////////////////////////////

/**
 * JUST PASS OBJECT to observable to produce to the FROM function !
 *  The difference with OF is just you encapsulate values and send just one object to it. you can check the imput of it !
 */

//let source2$=from(allBooks);
//source2$.subscribe((val)=> console.log(val.title));

/////////////////////////////////////////////////////////////////////////////////

/**
 * concat values that returns from different observables
 */

//  concat(source1$,source2$)
//     .subscribe((val)=> console.log(val));


/////////////////////////////////////////////////////////////////////////////////

/**
 * Here we create observable fromEvent on the click event of the button.
 */

//  let button=document.getElementById('readersBtn');

// fromEvent(button,'click')
//     .subscribe(event=>{
//         console.log(event);
//         let readersDiv=document.getElementById('readers');
//         for (const reader of allReaders) {
//             readersDiv.innerHTML+= reader.name+"<br>"
//         }
//     });

/////////////////////////////////////////////////////////////////////////////////

/**
 * Using rxjs AJAX to create observables. The ajax function would return an observable so we can chain subscribe on it.
 */

let button=document.getElementById('readersBtn');

fromEvent(button,'click')
    .subscribe(event=>{
       ajax('/api/readers')
            .subscribe(ajaxResponse=>{
                console.log(ajaxResponse);
                let readersDiv=document.getElementById('readers');
                for (const reader of ajaxResponse.response) {
                    readersDiv.innerHTML+= reader.name+"<br>";
                }
                
            })
    });