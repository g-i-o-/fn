/*jshint node:true */
/*jshint mocha:true */
/*jshint expr:true */
"use strict";


var chai = require('chai'), should = chai.should(), expect = chai.expect;
var sinon = require('sinon');
var rewire = require('rewire');
var curry = rewire('../../lib/curry');

describe('curry', function(){
    var c = {hi:1}, ret = {val:1234};

    describe('[function]', function(){
        it('should return a function.', function(){
            var curried_fn = curry(function(){});
            expect(curried_fn).to.be.function;
        });
        it('should initialize the arity, the this context, and arguments, if given.', function(){
            var curried_fn = curry(function(){}, 4, c, [1,2]);
            expect(curried_fn.context).to.equal(c);
            expect(curried_fn.arity).to.equal(4);
            expect(curried_fn.args).to.deep.equal([1, 2]);
        });
    });
    describe('[return value]', function(){
        it('returns a function until the number of arguments is less than the arity.', function(){
            expect(curry(function(){ return ret;}, 2)(1)).to.be.function;
            expect(curry(function(){ return ret;}, 2)(1)(1)).to.be.function;
            expect(curry(function(){ return ret;}, 1)(1)).to.equal(ret);
            expect(curry(function(){ return ret;}, 0)()).to.equal(ret);
        });

        it('calling the functions collects the given arguments.', function(){
            var curried_fn = curry(function(){}, 4);
            expect(curried_fn.args).to.deep.equal([]);
            expect(curried_fn(1).args).to.deep.equal([1]);
            expect(curried_fn(1)(2).args).to.deep.equal([1, 2]);
            expect(curried_fn(1)(2)(3).args).to.deep.equal([1, 2, 3]);
        });

        it('mora than one argument can be passed at a time.', function(){
            var curried_fn = curry(function(){}, 4);
            expect(curried_fn(1, 2, 3).args).to.deep.equal([1, 2, 3]);
        });
    });
});
