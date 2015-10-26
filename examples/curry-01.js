var fn=require('../');

/*--------------*/

function add(x, y){
    return x + y;
}

var plus = fn.curry(add, 2);

console.log( plus(5)(2) );
console.log([1,2,3,4,5].map(plus(5)));

/*--------------*/
/** Output:

7
[ 6, 7, 8, 9, 10 ]

**/
