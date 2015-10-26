# fn-util
Yes, Yet another functional library toolkit. This is just a collection of functional programming tools that I have used have been useful for me.

![fn-util build status](https://travis-ci.org/g-i-o-/fn-util.svg)

## bind
Wraps a given function within a bound function that applies a given `this` context and any optional left and right arguments.

Examples:

`this` binding:
```javascript
// the module scope
var name="the module scope", description="the default this context";
// a simple robot object
var robot = {
    name : 'Robot',
    description : 'a killing machine',
    describeSelf: function(){
        console.log("Hello, my name is ", this.name, ", and I am ", this.description);
    }
}

// the robot describes itselfx
robot.describeSelf();
// Output: Hello, my name is Robot, and I am a killing machine

// the same thing
fn.bind(robot.describeSelf, robot)();
// Output: Hello, my name is Robot, and I am a killing machine
```


Left binding
```javascript

function command(who, what, act, upon){
    console.log(who + " " + what + ": " + act + " " + upon);
}

var simonSays = fn.bind(say).lbind("Simon", "says");
simonSays("Jump", "on one leg"); // Ouput: Simon says: jump on one leg
simonSays("Spin", "around"); // Ouput: Simon says: spin around

```




removes packages and builds (node_modules, bower_components, public/assets)

`grunt clean`

to run unit tests

`grunt test`

dependecy graphs (requires Graphviz installed)

`grunt angular-depends` for frontend
`npm run dep-graph` for backend (need npm package `madge`)
