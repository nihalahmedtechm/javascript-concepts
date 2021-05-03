////////////////Currying/////////////

/**
 * Currying is an advanced technique of working with functions. It’s used not only in JavaScript,
 *  but in other languages as well.Currying is a transformation of functions that translates a 
 * function from callable as f(a, b, c) into callable as f(a)(b)(c).
Currying doesn’t call a function. It just transforms it.
 */

function curry(a) {
    return function (b) {
        return function (c) {
            return a + b + c;
        }
    }
}

console.log(curry(10)(20)(30))
// out 60

////////////or///////////////

const curryArrow = (a) => (b) => (c) => a + b + c;
console.log(curryArrow(10)(20)(30))

//// out 60

/////////////////////////// other example//////////////


function curryCb(cb) {
    return function (a) {
        return function (b) {
            return cb(a, b)
        }
    }
}

const sum = function (a, b) {
    return a + b;
}

const curriedSum  = curryCb(sum)

console.log(curriedSum(10)(20))

/// output 30


//////////Advanced curry implementation////////////////////
/*In case you’d like to get in to the details, here’s the “advanced” curry implementation for multi-argument functions that we could use above.*/

function advCurry(cb){
    return function curried(...args){
        if (args.length >= cb.length) {
            return cb.apply(this, args);
          } else {
            return function(...args2) {
              return curried.apply(this, args.concat(args2));
            }
          }
    }
}


function sum1(a, b, c) {
    return a + b + c;
  }
  
  let curriedSum1 = advCurry(sum1);
  
  console.log( curriedSum1(1, 2, 3) ); // 6, still callable normally
  console.log( curriedSum1(1)(2,3) ); // 6, currying of 1st arg
  console.log( curriedSum1(1)(2)(3) ); // 6, full currying
