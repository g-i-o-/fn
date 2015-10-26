var fn=require('../');

/*--------------*/

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

/*--------------*/
/** Output:

Hello, my name is  Robot , and I am  a killing machine
Hello, my name is  Robot , and I am  a killing machine
Hello, my name is  Robot , and I am  a killing machine
Hello, my name is  global scope , and I am  the default this context, harmless, but mostly unintented.

**/
