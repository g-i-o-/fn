var fn=require('../');

/*--------------*/

function command(who, what, act, upon){
    console.log(who + " " + what + ": " + act + " " + upon);
}

var simonSays = fn.bind(command).lbind("Simon", "says");
simonSays("Jump", "on one leg");
simonSays("Spin", "around");


/*--------------*/
/** Output:

Simon says: Jump on one leg
Simon says: Spin around

**/
