---
title: TypeScript学习笔记·1
date: 2020-04-07 18:08:30
tags: [TypeScript, Tools]
categories: 前端工具
---

了解 TypeScript 并加以使用，可以帮助我们提高代码的质量。本文主要是对官方文档上的内容进行个人理解后的知识收集，想了解更详细内容，推荐 [TypeScript官网](https://www.typescriptlang.org/docs/handbook/basic-types.html)。

> **tip:** 在学习了解 TypeScript 的内容时，最好自己去实践一下。

<!-- more -->

### 基础类型

在 TS 中，需要使用变量时，最好提前说明变量的类型。目前支持的类型有：

- **布尔值** `let isBoolean: boolean = true;`
- **数字** `let maxNum: number = 10;` (除了10进制外，还支持16进制、2进制和8进制字面量)
- **字符串** `let name: string = 'nimo';`
- **数组** `let arr: number[] = [1, 2, 3];` 或 `let arr: Array<number> = [1, 2, 3]`;
- **元组 Tuple**：表示一个已知元素数量和类型的数组。 `let arr1: [string, number] = ['hi', 12];` （当访问元组的元素超过预设边界时，该元素的类型会变为一个联合类型）
- **枚举 Enum**: 更为友好的赋值。
    ```typescript
        enmu Color {Red, Green, Blue};
        let bookColor: Color = Color.Green;
        // 等价于 let bookColor: Color = Color[1];
    ```
- **Any**: 任意类型，主要在编程无法确认变量类型的情况下，支持动态设置。 `let resData: any = response.data;`
- **Void**: 空类型，常用于无返回值的函数。`function warn(): void {}`
- **Null & Undefined**: 在 `--strictNullChecks` 模式下，它们只能被赋值给自己和 `void`。
- **Never**：表示永不存值，常用于会抛出异常或根本不存在返回值的函数表达式或者箭头函数  `const error: Function = function (msg): never { throw new Error(msg); }; };`
- **Object**: 非原始类型，即 number，string，boolean，symbol，null 或 undefined 之外的类型。
- **类型断言**：对于明确了解的值的类型，可以使用类型断言进行类型转换，但不进行特殊数据检查和解构，它只会在编译阶段有效。其方式有：

> - "尖括号":

```
    let data: any = 'string';
    let len: number = (<string>data).length;
```

> - "as 语法"：

```
    let data: any = 'string';
    let len: number = (data as string).length;
```

> 在 TypeScript 中，可以将数组设置为只读，其效果与数组泛型 `Array<Type>` 相似，只是去掉了所有可变的方法，确保数组创建后不能被修改。 eg. `let arr: ReadonlyArray<number> = [1, 2, 3, 4];`


### 变量声明

在 `ECMAScript` 中， `var` 变量声明的方式，作用于函数作用域，存在变量提升，同时容易引起误解。

```javascript
// 变量提升、函数作用域
function getX(hasInit) {
    if (!hasInit) {
        var x = 10;
    }
    return x;
}
getX(true); // undefined
getX(false); // 10
x // Uncaught ReferenceError: x is not defined

// 同一函数作用域
for (var i = 0; i < 10; i++) {
    setTimeout(function () {
        console.log(i);
    }, 100 * i);
}
// 打印结果并非我们期待的：0 1 2 3 4 5 6 7 8 9
```

#### let

`let` 是 **块级作用域**（也叫词法作用域），在区块之外是不能访问的，同时也不能在声明之前进行读写操作（即虽然声明的变量始终存在于区块内，但是在声明前的代码区块都是属于 **“暂时性死区”**）。

在使用 `let` 的过程中，不能像 `var` 一样，使用 `let` 声明一个变量多次，也不能同时 `let` 和 `var` 声明同一个变量。

```javascript
function test(x) {
    // let x = x; // Uncaught SyntaxError: Identifier 'x' has already been declared
    // console.log(a); // Uncaught ReferenceError: Cannot access 'a' before initialization
    let a = 1;
    
    if (x > 0) {
        let b = x * 2;
        return a + b;
    }
    
    // console.log(b); // Uncaught ReferenceError: b is not defined
    // let a = 10; // Uncaught SyntaxError: Identifier 'a' has already been declared
    // var a = 20; // Uncaught SyntaxError: Identifier 'a' has already been declared
    
    return a;
}
```

> 如果在嵌套的块级作用域，在不同的块级中，`let` 声明同名变量的话，内层的变量会 **屏蔽** 之前的变量。

```
let sum = 0;
for (let i = 0; i < matrix.length; i++) {
    let currentRow = matrix[i];
    for (let i = 0; i < currentRow.length; i++) {
        sum += currentRow[i];
    }
}
```

#### const

`const` 类似于 `let`，不同之处在于 `const` 声明的变量被赋值后就不能再改变。实际上 const 变量内部状态是可以修改的。

在 `typeScript` 中，请尽量使用 `let` 和 `const` 替代 `var` 。这样更容易推测数据的流动。

> 除了 `let` 和 `const` 变量声明，`typescript` 还支持 ES6 语法中的，解析运算符和拓展运算符，支持 数组解构、对象解构 

```javascript
/* 数组解构 */
let [first, ...rest] = [1, 2, 3, 4];
console.log(first); // 1
console.log(rest); // [ 2, 3, 4 ]

/* 对象解构 */
let { a, ...restObj } = { a: 'bax', b: 101, c: 12 };

/* 属性重命名 */
let {a: s1, b: s2}: {a: string, b: number} = {a: '1', b: 2};
console.log(s1); // '1'
console.log(s2); // 2
```

> **Waring**：在进行没有声明的对象赋值时，需要用括号包起来，因为在 JavaScript 通常将 `{` 解析为一个块。eg. `({a, b} =  { a: 'bax', b: 101, c: 12 });` 


### 接口

接口是 TypeScript 的核心之一，是一种额外的类型，主要用于结构类型检查，为这些类型命名和项目代码或第三方代码定义契约。

在使用接口过程中：1、可以通过在属性后添加 `?` 设置属性为可选。2、可以在属性名前用  `readonly` 来指定只读。

```
interface Point {
    x: number; // 必须属性
    title?: string; // 可选属性
    readonly y: number; // 只读属性
}
```

> 在 TypeScript 类型检查中，存在 **额外的属性检查**。即如果传入的参数存在接口声明中不存在的属性，TypeScript 就会报错。
> 
> - 如果想要绕开这些检查，最简单的方法就是 **使用类型断言**。
> - 如果一个对象上可能存在任意数量的其他属性，最佳的方法就是添加 **字符串索引签名**。
> - 如果将对象赋值给变量，通过变量的方式传递参数，也不会经过额外属性检查。

```
interface Point {
    x: number;
    y: number;
    [propName: string]: any; // 利用字符串索引签名支持其他属性
}

function createSquare (config: Point): { area: number } {}

let mySquare = createSquare({width: 10, x: 1, y: 2} as Point); // 利用类型断言绕开检查
let data = {width: 10, x: 1, y: 2};
let mySquare2 = createSquare(data);
```

接口可以描述变量和参数，也可以用于描述函数的类型和类的类型。
除了变量、参数的类型检查外，接口 也常用于描述 函数 和 类。

```
interface isAdultFunc {
    (ages: number): boolean;
}
let mySearch: SearchFunc = function (ages) {
    return ages >= 18;
}

interface ClockInterface {
    currentTime: Date;
    setTime(d: Date): void;
}
class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}
```

和类一样，接口也是能相互继承的。一个接口可以继承多个接口，这样可以更加灵活地分割到可重用的模块中。

```
interface Shape {
    color: string;
}
interface PenStroke {
    penWidth: number;
}
interface Square extends Shape, PenStroke {
    sideLength: number;
}
```

接口除了继承接口外，接口还可以继承类。接口继承类时，会继承类的成员但不包括其实现。就好像是声明了继承类中存在的成员，但不提供具体实现一样。（不建议这么使用，因为接口继承类时，也会继承类的 `private`  和 `protected` 成员，这也就意味着当你创建的接口击沉那个了一个拥有私有或者受保护的成员的类时，这个接口类型就只能被这个类或者其子类所实现）


### 类

ES6 目前已经支持 `class` 了，TypeScript 中的类和 ES6 语法类似。同时TypeScript 中类还支持 `public\private\protected` 等修饰符。

==**注意：**==
- 在 `TypeScript` 中，成员默认视为 `public` 修饰符声明的 **公共成员**。
- 成员被标记为 `private` 时，该成员为 **私有成员** 就不能再声明它的类的外部访问。
- 成员被标记为 `protected` 时，其行为与 `private` 修饰符的行为很相似，但有一点不同，**受保护成员** 在派生类中仍然可以访问。
- 除了常用的 `public\private\protected` 修饰符，也可以通过 `readonly` 关键词将属性 **成员设置为只读**。这种只读的属性必须在声明时或构造函数中被初始化。
- 在 TypeScript 中使用 `getters/setters` **存取器** 来截取对象成员的访问和设置时，需将编译器的输出环境设置为 ECMAScript 5 或更高。其次，只拥有 `get` 而不带 `set` 的存取器会被自动推断为 `readonly`。
- 成员被标记为 `static` 时，该成员即为 **静态成员**。实例对象中的方法如果需要访问这个属性的时候需要在前面加上类名，如同在实例中使用 `this.` 前缀访问属性一样。

> **tips:**
>
> - 在 TypeScript 的类中可以通过 **参数属性** （即通过在构造函数参数前添加一个访问限定符来声明）的方式来快速声明并初始化一个参数。
> - 在 TypeScript 中，可通过 `abstract` 关键词，定义 **抽象类** 和内部的抽象方法。抽象类一般不会直接实例化。不同于接口的是，抽象类可以包含成员实现细节。需要注意的是，抽象类的抽象方法类似于接口的语法，不包含具体实现，其派生类中必须实现该方法。

```
class Person {
    name: string;
    provite ages: number;
    protected sex: string;
    readonly maxAges: number = 100;
    static ancestor = 'ape man';
    constructor(readonly minAges: number = 0) { // 等价于声明了一个只读属性 minAges，并通过参数赋值
    }
    getHi() {
        return `hi ${this.name | Person.ancestor}`;
    }
}
```

#### 继承

在 TypeScript 中类和 ES6 一样，可以通过 `extends` 关键词进行继承，同时子类（又被称为 派生类）的构造函数必需调用 `super()` 执行父类（又称为基类、超类）的构造函数。

> 在继承时，如果访问 `this` 属性，一定需要在调用 `super()` 之后。

```
abstract class Animal {
    static hi = 'hi';
    constructor(public name: string) { }
    abstract makeSound(): void;
    move(): void {
        console.log(`${this.name} is moving...`);
    }
    sayHi(): void {
        console.log(Animal.hi);
    }
}

class Dog extends Animal {
    constructor(name: string) {
		super(name);
	}
	makeSound() {
		console.log('wow');
	}
}

let dog: Dog; // 表示 Dog 的实例的类型是 Dog
dog = new Dog('DOG');

let DogMaker: typeof Dog = Dog; // typeof Dog 表示取 Dog 类的类型，而不是实例类型。
DogMaker.hi = 'Hello';

let dog2: Dog = new DogMaker('DOG');
console.log(dog2.sayHi());
```


### 函数

TypeScript 可以为函数定义类型。一个完整的函数类型包含两部分：参数类型和返回值类型。对于返回值，在函数和返回值类型之前使用 `=>` 可以使之清晰，如果没有返回值，需指定返回值类型为 `void`。

```
let myAdd: (baseValue: number, increment: number) => number =
    function(x: number, y: number): number { return x + y; };
```

#### this

在 JavaScript 中，`this` 的值只会在函数被调用时才能确定。在 TypeScript 中，为了避免代码歧义，可以提供一个显式的 `this` **参数**。 这个 `this` 参数是一个假的参数，它出现在参数列表的最前面：

```
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```

> 注意：
> 
> - 箭头函数不会捕获 `this`（箭头函数会保存函数创建时的 `this`）。
> - 如果期待的回调函数不要求 `this`，可以在回调函数类型声明中使用 `this: void` 表示回调函数不要求 `this`，避免出现调用错误。

```
interface CustomEvent {
	message: string;
}

function addCustomEventListener(callback: (this: void, e: CustomEvent) => void): void {
	// todos
}

class Handler {
    info: string;
    onEvent(this: Handler, e: CustomEvent) {
        // oops, used this here. using this callback would crash at runtime
        this.info = e.message;
    }
    onError = (e: CustomEvent) => {
        // this 不会被捕获。缺点：1、每个实例都会创建一个箭头函数
        this.info = e.message;
    }
}
let h = new Handler();
// addCustomEventListener(h.onEvent); // error!
addCustomEventListener(h.onError); // ok!
```

#### 重载

在 JavaScript 中依据不同的参数而返回不同的结果是很常见的。在 TypeScript 中为了避免出现代码混乱，可以通过重载的方式声明函数的参数和返回结果，这样就可以检查是否有错误调用。

```
interface Card {
	suit: string,
	card: number,
}
let suits: Array<string> = ["hearts", "spades", "clubs", "diamonds"];
function pickCard(x: Card[]): number;
function pickCard(x: number): Card;
function pickCard(x: any): any {
	if (typeof x === 'object' && x !== null) {
		let pickedCard = Math.floor(Math.random() * x.length);
		return pickedCard;
	}

	if (typeof x === 'number') {
		let pickedSuit = Math.floor(x / 13);
		return { suit: suits[pickedSuit], card: x % 13 };
	}
}

pickCard('2') // Error: No overload matches this call
```

> 注意：
> 
> - 编译器检查类型时，查找重载列表会尝试使用第一个重载定义，如果匹配就使用这个。因此在重载时，一定要将最精确的定义放在前面。
> - `function pickCard(x): any` 并不是重载列表的一部分，因此这里只有两个重载：一个是接收对象另一个接收数字。 以其它参数调用 pickCard 会产生错误。