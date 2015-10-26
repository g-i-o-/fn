# fn-util
Yes, Yet another functional library toolkit. This is just a collection of functional programming tools that have been useful for me.

![fn-util build status](https://travis-ci.org/g-i-o-/fn-util.svg)

## bind

Wraps a given function within a bound function that applies a given `this` context and any optional left and right arguments. Like `Function.bind`, it provides context and argument binding to a function. It also provides right argument binding and has a more readable binding API.

Examples:

1.) `this` context binding:

```javascript

GLOBAL.name="global scope";
GLOBAL.description="the default this context, harmless, but mostly unintented.";
// a simple robot object
var robot = {
    name : 'Robot',
    description : 'a killing machine',
    describeSelf: function(){
        console.log("Hello, my name is ", this.name, ", and I am ", this.description);
    }
};

// the robot describes itself
robot.describeSelf();

// the same thing
fn.bind(robot.describeSelf, robot)();

// the same thing
fn.bind(robot.describeSelf).ctx(robot)();

// binds to global scope by default
fn.bind(robot.describeSelf)();

/** Output:

Hello, my name is  Robot , and I am  a killing machine
Hello, my name is  Robot , and I am  a killing machine
Hello, my name is  Robot , and I am  a killing machine
Hello, my name is  global scope , and I am  the default this context, harmless, but mostly unintented.

**/
```


2.) Left argument binding

```javascript

function command(who, what, act, upon){
    console.log(who + " " + what + ": " + act + " " + upon);
}

var simonSays = fn.bind(command).lbind("Simon", "says");
simonSays("Jump", "on one leg");
simonSays("Spin", "around");


/** Output:

Simon says: Jump on one leg
Simon says: Spin around

**/
```


3.) Right argument binding

```javascript

function command(who, what, act, upon){
    console.log(who + " " + what + ": " + act + " " + upon);
}

var commandToJump = fn.bind(command).rbind("says", "Jump", "on one leg");
commandToJump("Simon");
commandToJump("Peter");
commandToJump("Martha");

/** Output:

Simon says: Jump on one leg
Peter says: Jump on one leg
Martha says: Jump on one leg

**/
```

## curry

Makes a given function curriable. A curriable function of a given arity that collects their given arguments and return another curriable function, if the number of arguments is less than its arity, otherwise it runs its code.

Example:

```javascript

function add(x, y){
    return x + y;
}

var plus = fn.curry(add, 2);

console.log( plus(5)(2) );
console.log([1,2,3,4,5].map(plus(5)));

/** Output:

7
[ 6, 7, 8, 9, 10 ]

**/
```
