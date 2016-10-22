# signals
A signal implementation based on active expressions

`signal s = expr;` can be easily expressed using active expression as:
```JavaScript
let s = aexpr(() => expr)
  .onChange(val => b = val)
  .getCurrentValue();
```
