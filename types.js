const check = require('./index')

module.exports = {
  // literally anything
  Any: i => i != null,

  // primitives
  Str: i => i != null && (i).constructor === String,
  Num: i => i != null && (i).constructor === Number,
  Bool: i => i != null && (i).constructor === Boolean,

  // number types
  Int: Number.isInteger,
  Float: i => i != null && (i).constructor === Number && !Number.isInteger(i),

  // complex types
  Arr: type => i => Array.isArray(i) && i.every(type),
  Obj: o => i => i != null && (i).constructor === Object && check(i, o),
  Hash: i => i != null && (i).constructor === Object,
  Dat: i => i != null && (i).constructor === Date,
  Fun: i => i != null && (i).constructor === Function,

  // comparative types
  GT: (n, type) => i => type(i) && i > n,
  GTE: (n, type) => i => type(i) && i >= n,
  LT: (n, type) => i => type(i) && i < n,
  LTE: (n, type) => i => type(i) && i <= n,
  EQ: (n, type) => i => type(i) && i == n,
  EQQ: (n, type) => i => type(i) && i === n,
  NEQ: (n, type) => i => type(i) && i != n,
  NEQQ: (n, type) => i => type(i) && i !== n,
  Or: (...types) => i => types.some(t => t(i)),
  Not: (...types) => i => i != null && types.every(t => !t(i)),
  Enum: (...values) => i => values.includes(i),

  // optional property
  Optional: type => i => i == null || type(i)
}
