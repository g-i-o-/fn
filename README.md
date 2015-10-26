# fn-util
Yes, Yet another functional library toolkit. This is just a collection of functional programming tools that have been useful for me.

![fn-util build status](https://travis-ci.org/g-i-o-/fn-util.svg)

## bind

Wraps a given function within a bound function that applies a given `this` context and any optional left and right arguments. Like `Function.bind`, it provides context and argument binding to a function. It also provides right argument binding and has a more readable binding API.

Examples:

1.) `this` context binding:

```javascript
// a simple robot object
var robot = {
    name : 'Robot',
    description : 'a killing machine',
    describeSelf: function(){
        console.log("Hello, my name is ", this.name, ", and I am ", this.description);
    }
}

// the robot describes itself
robot.describeSelf();
// Output: Hello, my name is Robot, and I am a killing machine

// the same thing
fn.bind(robot.describeSelf, robot)();
// Output: Hello, my name is Robot, and I am a killing machine

// the same thing
fn.bind(robot.describeSelf).ctx(robot)();
// Output: Hello, my name is Robot, and I am a killing machine
```


2.) Left argument binding

```javascript

function command(who, what, act, upon){
    console.log(who + " " + what + ": " + act + " " + upon);
}

var simonSays = fn.bind(say).lbind("Simon", "says");
simonSays("Jump", "on one leg"); // Ouput: Simon says: jump on one leg
simonSays("Spin", "around"); // Ouput: Simon says: spin around

```


3.) Right argument binding

```javascript

function command(who, what, act, upon){
    console.log(who + " " + what + ": " + act + " " + upon);
}

var commandToJump = fn.bind(say).rbind("says", "Jump", "on one leg");
commandToJump("Simon"); // Ouput: Simon says: jump on one leg
commandToJump("Peter"); // Ouput: Peter says: jump on one leg
commandToJump("Martha"); // Ouput: Martha says: jump on one leg

```
