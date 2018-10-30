const check = require('./index')

// any non null value
const Any = i => i != null

// primitives
const Str = i => Any(i) && (i).constructor === String
const Num = i => Any(i) && (i).constructor === Number
const Bool = i => Any(i) && (i).constructor === Boolean
const Hash = i => Any(i) && (i).constructor === Object
const Dat = i => Any(i) && (i).constructor === Date
const Fun = i => Any(i) && (i).constructor === Function

// number types
const Int = Number.isInteger
const Float = i => Num(i) && !Number.isInteger(i)

// complex types
const Arr = type => i => Array.isArray(i) && i.every(type)
const Obj = o => i => Any(i) && (i).constructor === Object && check(i, o)

// comparative types
const GT = (n, type) => i => type(i) && i > n
const GTE = (n, type) => i => type(i) && i >= n
const LT = (n, type) => i => type(i) && i < n
const LTE = (n, type) => i => type(i) && i <= n
const EQ = (n, type) => i => type(i) && i == n
const EQQ = (n, type) => i => type(i) && i === n
const NEQ = (n, type) => i => type(i) && i != n
const NEQQ = (n, type) => i => type(i) && i !== n
const Or = (...types) => i => types.some(t => t(i))
const Not = (...types) => i => Any(i) && types.every(t => !t(i))
const Enum = (...values) => i => values.includes(i)

// optional property
const Optional = type => i => i == null || type(i)

module.exports = {
  Any,
  Str, Num, Bool, Hash, Dat, Fun,
  Int, Float,
  Arr, Obj,
  GT, GTE, LT, LTE, EQ, EQQ, NEQ, NEQQ, Or, Not, Enum,
  Optional
}
