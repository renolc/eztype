# genre [![npm version](https://badge.fury.io/js/genre.svg)](https://badge.fury.io/js/genre)

Object template declaration and runtime type checking

## Installation

`npm i genre`

## Usage

`genre` is really just a simple function. It takes in an `object`, and a `template` you wish to compare it to. The function will return `true` or `false` depending on if the `object` matches the `template`.

```js
const check = require('genre')

const template = {
  name: i => i === 'Bob'
}

check({ name: 'Bob' }, template)  // true
check({ name: 'John' }, template) // false
```

As the above code shows, the template is an object with functions to validate fields. In this example, the name field is being validated as equaling "Bob".

This isn't a very handy template, but it showcases how `genre` can be used to validate fields on objects. Most of the time you will care more about the presence of certain fields, and what types or range the values are in. For this reason, `genre` comes with several predefined `types` you may utilize as well:

```js
const check = require('genre')
const { Str, Num, Bool } = require('genre/types')

const template = {
  name: Str,
  age: Num,
  isAdmin: Bool
}

// true
check({
  name: 'Phil',
  age: 30,
  isAdmin: true
}, template)
```

## Types

Here is a list of all predefined types `genre` includes:

| Name | Description |
| --- | --- |
| `Str` | is value a `String` |
| `Num` | is value a `Number` |
| `Bool` | is value a `Boolean` |
| `Int` | is value an integer |
| `Float` | is value a float |
| `Arr(<type>)` | is value an array of `<type>` |
| `Obj(<template>)` | does value match the provided `template` |
| `Dat` | is value a `Date` |
| `Fun` | is value a `Function` |
| `GT(n, <type>)` | is value a `<type>` that is > `n` |
| `GTE(n, <type>)` | is value a `<type>` that is >= `n` |
| `LT(n, <type>)` | is value a `<type>` that is < `n` |
| `LTE(n, <type>)` | is value a `<type>` that is <= `n` |
| `EQ(n, <type>)` | is value a `<type>` that is == `n` |
| `EQQ(n, <type>)` | is value a `<type>` that is === `n` |
| `NEQ(n, <type>)` | is value a `<type>` that is == `n` |
| `NEQQ(n, <type>)` | is value a `<type>` that is === `n` |
| `Or(<type1>, <type2>)` | is value a `<type1>` or `<type2>` |
| `Optional(<type>)` | make field optional (validates to true if `null` or `undefined`) |

## Advanced Types

Types can be combined to create advanced types for use in templates:

```js
const Between0And100 = GTE(0, LTE(100, Int))

const Documents = Arr(Obj({
  title: Str,
  content: Str
}))

const ArrayOfIntsOrStrings = Arr(Or(Int, Str))

const OptionalArrayOfNonEmptyStrings = Optional(Arr(NEQ(false, Str)))
```

By default, if any field defined on the `template` is missing from the `object`, the check will fail. Utilize `Optional` to define fields as being not required.

Once again, the `types` are really just functions that take in a value and return `true` or `false` if they should pass. Feel free to create your own validation functions to use and abuse as you see fit:

```js
const template = {
  // only even ages... for reasons
  age: i => i % 2 === 0,

  // check against list of allowed names
  name: i => ['Phil', 'Amanda', 'Chris'].includes(i),

  // flip of the coin -- not recommended
  isAdmin: () => Math.random() > 0.5
}
```