---
title: reduce
categories: 每日一题
date: 2019-03-06 20:40:47
tags:
---

原问题为：
```javascript
[ [3,2,1].reduce(Math.pow), [].reduce(Math.pow) ] // TypeError

var val = 'smtg';
console.log('Value is ' + (val === 'smtg') ? 'Something' : 'Nothing'); // Something

var ary = [0,1,2];
ary[10] = 10;
ary.filter(function(x) { return x === undefined;}); // []

var two   = 0.2
var one   = 0.1
var eight = 0.8
var six   = 0.6
[two - one == one, eight - six == two] // [true, false]

Array.isArray( Array.prototype ) // true

var a = [0];
if ([0]) {
  console.log(a == true);
} else {
  console.log("wut");
}  // false

1 + - + + + - + 1 // 2

var ary = Array(3);
ary[0]=2
ary.map(function(elem) { return '1'; }); // ['1', undefined, undefined]

var a = 111111111111111110000,
    b = 1111;
a + b // 111111111111111110000

var x = [].reverse;
x(); // window

3.toString()
3..toString()
3...toString() // error, "3", error

var a = {}, b = Object.prototype;
[a.prototype === b, Object.getPrototypeOf(a) === b] // [false, true]

function foo() { }
var oldName = foo.name;
foo.name = "bar";
[oldName, foo.name] // ["foo", "foo"]

function f() {}
var parent = Object.getPrototypeOf(f);
f.name // ?
parent.name // ?
typeof eval(f.name) // ?
typeof eval(parent.name) //  ? // ["f", "Empty", "function", error]

var lowerCaseOnly =  /^[a-z]+$/;
[lowerCaseOnly.test(null), lowerCaseOnly.test()] // [true, true]

[,,,].join(", ") // ", , "

var a = {class: "Animal", name: 'Fido'};
a.class  // other  在不同浏览器中效果不同

var a = new Date("epoch") // 

var a = Function.length,
    b = new Function().length
a === b // false

function captureOne(re, str) {
  var match = re.exec(str);
  return match && match[1];
}
var numRe  = /num=(\d+)/ig,
    wordRe = /word=(\w+)/i,
    a1 = captureOne(numRe,  "num=1"),
    a2 = captureOne(wordRe, "word=1"),
    a3 = captureOne(numRe,  "NUM=2"),
    a4 = captureOne(wordRe,  "WORD=2");
[a1 === a2, a3 === a4] // [true, false]


var a = new Date("2014-03-19"),
    b = new Date(2014, 03, 19);
[a.getDay() === b.getDay(), a.getMonth() === b.getMonth()] // [false, false]

if ('http://giftwrapped.com/picture.jpg'.match('.gif')) {
  'a gif file'
} else {
  'not a gif file'
} // 'a gif file'
```

### 相关参考：

- [](http://javascript-puzzlers.herokuapp.com/)

### 自我总结：

