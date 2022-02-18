const { observable, Observable } = require('rxjs');
const { filter } = require('rxjs/operators')

const doSomething = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('valor 3');
    }, 3000)
    // resolve('valor 1');
    // resolve('valor 2');
  });
};

const doSomething$ = () => {
  return new Observable(observer => {
    observer.next('value 1 $')
    observer.next('value 2 $')
    observer.next('value 3 $')
    observer.next(null)
    setTimeout(() => {
      observer.next('valor 4 $')
    }, 5000)
    setTimeout(() => {
      observer.next(null)
    }, 8000)
    setTimeout(() => {
      observer.next('valor 5 $')
    }, 10000)
  })
};

(async () => {
  const answer = await doSomething();
  console.log(answer);
})();

(() => {
  const obs$ = doSomething$()
  obs$
  .pipe(
    filter(value => value !== null)
  )
  .subscribe(answer => {
    console.log(answer);
  })
})();
