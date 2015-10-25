/*jshint node:true */
/*jshint mocha:true */
/*jshint expr:true */
"use strict";


var chai = require('chai'), should = chai.should(), expect = chai.expect;
var sinon = require('sinon');
var rewire = require('rewire');
var bind = rewire('../../lib/bind');

describe('bind', function(){
    describe('[function]', function(){
        it('should return a function.', function(){
            var bound_fn = bind(function(){});
            expect(bound_fn).to.be.function;
        });
        it('should initialize this context, and left and right bound arguments, if given.', function(){
            var c={hi:1};
            var bound_fn = bind(function(){}, c, [1,2], [3,4]);
            expect(bound_fn).to.be.function;
            expect(bound_fn._ctx).to.equal(c);
            expect(bound_fn._lbind).to.deep.equal([1, 2]);
            expect(bound_fn._rbind).to.deep.equal([3, 4]);
        });
        it('initialized left and right bound arguments are shallow copied.', function(){
            var c={}, l=[1,2], r=[3,4];
            var bound_fn = bind(function(){}, c, l, r);
            expect(bound_fn).to.be.function;
            expect(bound_fn._ctx).to.equal(c);
            expect(bound_fn._lbind).to.not.equal(l);
            expect(bound_fn._rbind).to.not.equal(r);
        });
        describe('[return value]', function(){
            it('calls the original function with the given this context, and left and right arguments.', function(done){
                var c={hi:1}, l=[1,2], r=[3,4];
                var bound_fn = bind(function(){
                    var args = Array.prototype.slice.call(arguments);
                    expect(this).to.equal(c);
                    expect(args.length).to.equal(4);
                    expect(args.slice(0, 2)).to.deep.equal([1,2]);
                    expect(args.slice(-2)).to.deep.equal([3,4]);
                    done();
                }, c, l, r);

                bound_fn();
            });
            it('calls the original function with the given this context, and left arguments, function arguments and right arguments.', function(done){
                var c={hi:1}, l=[1,2], r=[3,4];
                var bound_fn = bind(function(){
                    var args = Array.prototype.slice.call(arguments);
                    expect(this).to.equal(c);
                    expect(args.length).to.equal(6);
                    expect(args.slice(0, 2)).to.deep.equal([1,2]);
                    expect(args.slice(2, 4)).to.deep.equal(['a', 'b']);
                    expect(args.slice(-2)).to.deep.equal([3,4]);
                    done();
                }, c, l, r);

                bound_fn('a', 'b');

            });
            it('just calls the original function if nothing is bound.', function(done){
                var bound_fn = bind(function(){
                    var args = Array.prototype.slice.call(arguments);
                    // expect(this).to.equal(null);
                    expect(args.length).to.equal(0);
                    done();
                });

                bound_fn();

            });
            it('returns whatever the given function call returned.', function(){
                var c={hi:1}, l=[1,2], r=[3,4];
                var bound_fn = bind(function(a ,b, c){
                    return [a, b, c];
                });

                expect(bound_fn(c, l, r)).to.deep.equal([c, l, r]);

            });
            it('passes the this context to given function if no context is bound.', function(done){
                var c={
                    hi:1,
                    bound_fn : bind(function(){
                        expect(this).to.equal(c);
                        done();
                    })
                };

                c.bound_fn();
            });

            describe('ctx', function(){
                it('sets the bounded this context.', function(){
                    var c={}, l=[1,2], r=[3,4], k={q:7};
                    var bound_fn = bind(function(){}, c, l, r);

                    bound_fn.ctx(k);

                    expect(bound_fn._ctx).to.equal(k);

                });
            });
            describe('lbind', function(){
                it('sets the bounded left arguments if thery were not set already.', function(){
                    var k={q:7};
                    var bound_fn = bind(function(){});

                    bound_fn.lbind(k);

                    expect(bound_fn._lbind).to.deep.equal([k]);

                });
                it('unshifts more bounded left arguments.', function(){
                    var l=[1,2], k={q:7};
                    var bound_fn = bind(function(){}, null, l, null);

                    bound_fn.lbind(k);

                    expect(bound_fn._lbind).to.deep.equal([k, 1, 2]);

                });
            });
            describe('rbind', function(){
                it('sets the bounded right arguments if thery were not set already.', function(){
                    var k={q:7};
                    var bound_fn = bind(function(){});

                    bound_fn.rbind(k);

                    expect(bound_fn._rbind).to.deep.equal([k]);

                });
                it('pushes more the bounded right arguments.', function(){
                    var r=[3,4], k={q:7};
                    var bound_fn = bind(function(){}, null, null, r);

                    bound_fn.rbind(k);

                    expect(bound_fn._rbind).to.deep.equal([3, 4, k]);

                });
            });

        });
    });
    describe('[private]', function(){
        describe('this_arg_setter()', function(){
            var this_arg_setter = bind.__get__('this_arg_setter');
            var args = [undefined, null, 1, 'a', [], {}, /a/, function(){}];
            args.forEach(function(arg){
                it('should return a function when given ' + arg + '.', function(){
                    var r = this_arg_setter(arg);
                    expect(r).to.be.function;
                });
            });

            it('should set the attribute on the this context when callled.', function(){
                var o = {
                    set: this_arg_setter('arg')
                };

                expect(o.arg).to.be.empty;

                o.set('value');

                expect(o.arg).to.equal('value');
            });

        });
    });
});
