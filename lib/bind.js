var slice   = Array.prototype.slice   ;
var unshift = Array.prototype.unshift ;
var push    = Array.prototype.push    ;


var bound_fn_prototype = {
    ctx   : this_arg_setter("_ctx"),
    lbind : this_arg_setter(function(obj, values){
        unshift.apply(obj._lbind, values);
    }),
    rbind : this_arg_setter(function(obj, values){
        push.apply(obj._rbind, values);
    }),
};

function this_arg_setter(argument){
    if(argument instanceof Function){
        return function(){
            argument(this, slice.call(arguments));
            return this;
        };
    } else {
        return function(value){
            this[argument] = value;
            return this;
        };
    }
}



/**
 * Binds a function to the given parameters and context.
 * @param {Function} fn - function to bind
 * @param {Object} ctx - this context to bind to this function;
 * @param {Array} lbind - array of arguments to bind through the left.
 * @param {Array} rbind - array of arguments to bind through the right.
 * @return {Function} function bound to the given context, left and right arguments.
 */
function bind(fn, ctx, lbind, rbind){
    function bound_fn(){
        var args = slice.call(arguments);
        if(bound_fn._lbind.length){
            args.unshift.apply(args, bound_fn._lbind);
        }
        if(bound_fn._rbind.length){
            args.push.apply(args, bound_fn._rbind);
        }
        return fn.apply(bound_fn._ctx || this, args);
    }

    bound_fn._ctx = ctx ? ctx : undefined;
    bound_fn._lbind = lbind ? slice.call(lbind) : [];
    bound_fn._rbind = rbind ? slice.call(rbind) : [];
    Object.keys(bound_fn_prototype).map(function(k){
        bound_fn[k] = bound_fn_prototype[k];
    });

    return bound_fn;
}


// export the bind function
module.exports = bind;
