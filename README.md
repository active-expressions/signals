# signals [![Build Status](https://travis-ci.org/active-expressions/signals.svg?branch=master)](https://travis-ci.org/active-expressions/signals)
A signal implementation based on active expressions

`signal s = expr;` can be easily expressed using active expression as:
```JavaScript
let s = aexpr(() => expr)
  .onChange(val => b = val)
  .getCurrentValue();
```
