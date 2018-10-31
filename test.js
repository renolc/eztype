const { strictEqual:equal } = require('assert')
const check = require('./index')
const {
  Any,
  Str, Num, Bool,
  Int, Float,
  Arr, Obj, Dat, Fun,
  GT, GTE, LT, LTE, EQ, EQQ, NEQ, NEQQ, Or, Not, Enum,
  Optional
} = require('./types')

// any
equal(check({ a: '' }, { a: Any }), true)
equal(check({ a: 0 }, { a: Any }), true)
equal(check({ a: false }, { a: Any }), true)
equal(check({}, { a: Any }), false)

// primitives
equal(check({ a: '' }, { a: Str }), true)
equal(check({ a: 0 }, { a: Str }), false)

equal(check({ a: 0 }, { a: Num }), true)
equal(check({ a: false }, { a: Num }), false)

equal(check({ a: true }, { a: Bool }), true)
equal(check({ a: '' }, { a: Bool }), false)

equal(check({ a: new Date() }, { a: Dat }), true)
equal(check({ a: '' }, { a: Dat }), false)

equal(check({ a: ()=>{} }, { a: Fun }), true)
equal(check({ a: '' }, { a: Fun }), false)

// number types
equal(check({ a: 2 }, { a: Int }), true)
equal(check({ a: 2.1 }, { a: Int }), false)

equal(check({ a: 2.1 }, { a: Float }), true)
equal(check({ a: 2 }, { a: Float }), false)

// composite types
equal(check({ a: [] }, { a: Arr() }), true)
equal(check({ a: [1,2,3] }, { a: Arr() }), true)
equal(check({ a: [1,'2',3] }, { a: Arr() }), true)
equal(check({ a: [1,'2',3] }, { a: Arr(Int) }), false)
equal(check({ a: '' }, { a: Arr() }), false)

equal(check({ a: {} }, { a: Obj() }), true)
equal(check({ a: { b: 0 }}, { a: Obj() }), true)
equal(check({ a: '' }, { a: Obj() }), false)

equal(check({ a: {} }, { a: Obj({}) }), true)
equal(check({ a: { b: 0 }}, { a: Obj({ b: Int }) }), true)
equal(check({ a: '' }, { a: Obj({}) }), false)
equal(check({ a: {} }, { a: Obj({ b: Int }) }), false)

// comparative types
equal(check({ a: 1 }, { a: GT(0, Int) }), true)
equal(check({ a: 0 }, { a: GT(0, Int) }), false)
equal(check({ a: '' }, { a: GT(0, Int) }), false)

equal(check({ a: 0 }, { a: GTE(0, Int) }), true)
equal(check({ a: -1 }, { a: GTE(0, Int) }), false)
equal(check({ a: '' }, { a: GTE(0, Int) }), false)

equal(check({ a: -1 }, { a: LT(0, Int) }), true)
equal(check({ a: 0 }, { a: LT(0, Int) }), false)
equal(check({ a: '' }, { a: LT(0, Int) }), false)

equal(check({ a: 0 }, { a: LTE(0, Int) }), true)
equal(check({ a: 1 }, { a: LTE(0, Int) }), false)
equal(check({ a: '' }, { a: LTE(0, Int) }), false)

equal(check({ a: 1 }, { a: EQ(true, Int) }), true)
equal(check({ a: 0 }, { a: EQ(true, Int) }), false)
equal(check({ a: '' }, { a: EQ(true, Int) }), false)

equal(check({ a: 1 }, { a: EQQ(1, Int) }), true)
equal(check({ a: 0 }, { a: EQQ(1, Int) }), false)
equal(check({ a: '' }, { a: EQQ(1, Int) }), false)

equal(check({ a: 0 }, { a: NEQ(true, Int) }), true)
equal(check({ a: 1 }, { a: NEQ(true, Int) }), false)
equal(check({ a: '' }, { a: NEQ(true, Int) }), false)

equal(check({ a: 0 }, { a: NEQQ(1, Int) }), true)
equal(check({ a: 1 }, { a: NEQQ(1, Int) }), false)
equal(check({ a: '' }, { a: NEQQ(1, Int) }), false)

equal(check({ a: 1 }, { a: Or(Int, Str) }), true)
equal(check({ a: '1' }, { a: Or(Int, Str) }), true)
equal(check({ a: true }, { a: Or(Int, Str) }), false)

equal(check({ a: '' }, { a: Not(Int) }), true)
equal(check({ a: 2.1 }, { a: Not(Int) }), true)
equal(check({ a: 2 }, { a: Not(Int) }), false)

equal(check({ a: false }, { a: Not(Int, Str) }), true)
equal(check({ a: 2.1 }, { a: Not(Int, Str) }), true)
equal(check({ a: 2 }, { a: Not(Int, Str) }), false)
equal(check({ a: '2' }, { a: Not(Int, Str) }), false)

equal(check({ a: 'bork' }, { a: Enum('bork', 'blarg') }), true)
equal(check({ a: 'blarg' }, { a: Enum('bork', 'blarg') }), true)
equal(check({ a: 'broke' }, { a: Enum('bork', 'blarg') }), false)
equal(check({ a: 0 }, { a: Enum('bork', 'blarg') }), false)

// optional property
equal(check({}, { a: Optional(Int) }), true)
equal(check({ a: 0 }, { a: Optional(Int) }), true)
equal(check({ a: '' }, { a: Optional(Int) }), false)

console.log('All good ✔')
