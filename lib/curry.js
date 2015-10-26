var slice   = Array.prototype.slice   ;

/**
 * Makes a given function curriable.
 * @param {Function} fn - function to curry
 * @param {Object} arity - number of arguments to accept before calling the function.
 * @param {Object} context - context in which to call the curried function.
 * @param {Array} initialArgs - array of initial arguments.
 * @return {Function} curryable version of the given function.
 */
function curry(fn, arity, context, initialArgs){
    var curriable_fn = function curriable_fn(){
        var args = curriable_fn.args.concat(slice.call(arguments));
        if(args.length >= curriable_fn.arity){
            return curriable_fn.fn.apply(curriable_fn.context, args);
        } else {
            return curry(curriable_fn.fn, curriable_fn.arity, curriable_fn.context, args);
        }
    };

    curriable_fn.args = initialArgs || [];
    curriable_fn.fn = fn;
    curriable_fn.context = context;
    curriable_fn.arity = arity;
    
    return curriable_fn;
}


// export the bind function
module.exports = curry;
