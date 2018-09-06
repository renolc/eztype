const check = require('./index')

module.exports = {
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
  Or: (t1, t2) => i => t1(i) || t2(i),

  // optional property
  Optional: type => i => i == null || type(i)
}