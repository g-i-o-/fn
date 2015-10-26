var fn=require('../');

/*--------------*/

function command(who, what, act, upon){
    console.log(who + " " + what + ": " + act + " " + upon);
}

var commandToJump = fn.bind(command).rbind("says", "Jump", "on one leg");
commandToJump("Simon");
commandToJump("Peter");
commandToJump("Martha");

/*--------------*/
/** Output:

Simon says: Jump on one leg
Peter says: Jump on one leg
Martha says: Jump on one leg

**/
