const assert = require('assert')
const check = require('./index')
const {
  Any,
  Str, Num, Bool,
  Int, Float,
  Arr, Obj, Hash, Dat, Fun,
  GT, GTE, LT, LTE, EQ, EQQ, NEQ, NEQQ, Or, Not, Enum,
  Optional
} = require('./types')

// any
assert.equal(check({ a: '' }, { a: Any }), true)
assert.equal(check({ a: 0 }, { a: Any }), true)
assert.equal(check({ a: false }, { a: Any }), true)
assert.equal(check({}, { a: Any }), false)

// primitives
assert.equal(check({ a: '' }, { a: Str }), true)
assert.equal(check({ a: 0 }, { a: Str }), false)

assert.equal(check({ a: 0 }, { a: Num }), true)
assert.equal(check({ a: false }, { a: Num }), false)

assert.equal(check({ a: true }, { a: Bool }), true)
assert.equal(check({ a: '' }, { a: Bool }), false)

// number types
assert.equal(check({ a: 2 }, { a: Int }), true)
assert.equal(check({ a: 2.1 }, { a: Int }), false)

assert.equal(check({ a: 2.1 }, { a: Float }), true)
assert.equal(check({ a: 2 }, { a: Float }), false)

// complex types
assert.equal(check({ a: [] }, { a: Arr(Int) }), true)
assert.equal(check({ a: [1,2,3] }, { a: Arr(Int) }), true)
assert.equal(check({ a: '' }, { a: Arr(Int) }), false)
assert.equal(check({ a: [1,'2',3] }, { a: Arr(Int) }), false)

assert.equal(check({ a: {} }, { a: Obj({}) }), true)
assert.equal(check({ a: { b: 0 }}, { a: Obj({ b: Int }) }), true)
assert.equal(check({ a: '' }, { a: Obj({}) }), false)
assert.equal(check({ a: {} }, { a: Obj({ b: Int }) }), false)

assert.equal(check({ a: {} }, { a: Hash }), true)
assert.equal(check({ a: { b: 0 }}, { a: Hash }), true)
assert.equal(check({ a: '' }, { a: Hash }), false)

assert.equal(check({ a: new Date() }, { a: Dat }), true)
assert.equal(check({ a: '' }, { a: Dat }), false)

assert.equal(check({ a: ()=>{} }, { a: Fun }), true)
assert.equal(check({ a: '' }, { a: Fun }), false)

// comparative types
assert.equal(check({ a: 1 }, { a: GT(0, Int) }), true)
assert.equal(check({ a: 0 }, { a: GT(0, Int) }), false)
assert.equal(check({ a: '' }, { a: GT(0, Int) }), false)

assert.equal(check({ a: 0 }, { a: GTE(0, Int) }), true)
assert.equal(check({ a: -1 }, { a: GTE(0, Int) }), false)
assert.equal(check({ a: '' }, { a: GTE(0, Int) }), false)

assert.equal(check({ a: -1 }, { a: LT(0, Int) }), true)
assert.equal(check({ a: 0 }, { a: LT(0, Int) }), false)
assert.equal(check({ a: '' }, { a: LT(0, Int) }), false)

assert.equal(check({ a: 0 }, { a: LTE(0, Int) }), true)
assert.equal(check({ a: 1 }, { a: LTE(0, Int) }), false)
assert.equal(check({ a: '' }, { a: LTE(0, Int) }), false)

assert.equal(check({ a: 1 }, { a: EQ(true, Int) }), true)
assert.equal(check({ a: 0 }, { a: EQ(true, Int) }), false)
assert.equal(check({ a: '' }, { a: EQ(true, Int) }), false)

assert.equal(check({ a: 1 }, { a: EQQ(1, Int) }), true)
assert.equal(check({ a: 0 }, { a: EQQ(1, Int) }), false)
assert.equal(check({ a: '' }, { a: EQQ(1, Int) }), false)

assert.equal(check({ a: 0 }, { a: NEQ(true, Int) }), true)
assert.equal(check({ a: 1 }, { a: NEQ(true, Int) }), false)
assert.equal(check({ a: '' }, { a: NEQ(true, Int) }), false)

assert.equal(check({ a: 0 }, { a: NEQQ(1, Int) }), true)
assert.equal(check({ a: 1 }, { a: NEQQ(1, Int) }), false)
assert.equal(check({ a: '' }, { a: NEQQ(1, Int) }), false)

assert.equal(check({ a: 1 }, { a: Or(Int, Str) }), true)
assert.equal(check({ a: '1' }, { a: Or(Int, Str) }), true)
assert.equal(check({ a: true }, { a: Or(Int, Str) }), false)

assert.equal(check({ a: '' }, { a: Not(Int) }), true)
assert.equal(check({ a: 2.1 }, { a: Not(Int) }), true)
assert.equal(check({ a: 2 }, { a: Not(Int) }), false)

assert.equal(check({ a: false }, { a: Not(Int, Str) }), true)
assert.equal(check({ a: 2.1 }, { a: Not(Int, Str) }), true)
assert.equal(check({ a: 2 }, { a: Not(Int, Str) }), false)
assert.equal(check({ a: '2' }, { a: Not(Int, Str) }), false)

assert.equal(check({ a: 'bork' }, { a: Enum('bork', 'blarg') }), true)
assert.equal(check({ a: 'blarg' }, { a: Enum('bork', 'blarg') }), true)
assert.equal(check({ a: 'broke' }, { a: Enum('bork', 'blarg') }), false)
assert.equal(check({ a: 0 }, { a: Enum('bork', 'blarg') }), false)

// optional property
assert.equal(check({}, { a: Optional(Int) }), true)
assert.equal(check({ a: 0 }, { a: Optional(Int) }), true)
assert.equal(check({ a: '' }, { a: Optional(Int) }), false)

console.log('All good ✔')
