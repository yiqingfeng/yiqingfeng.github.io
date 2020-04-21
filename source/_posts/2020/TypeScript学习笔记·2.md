---
title: TypeScript学习笔记·2
date: 2020-04-21 17:28:52
tags: [TypeScript, Tools]
categories: 前端工具
---

了解 TypeScript 并加以使用，可以帮助我们提高代码的质量。本文主要是对官方文档上的内容进行个人理解后的知识收集，想了解更详细内容，推荐 [TypeScript官网](https://www.typescriptlang.org/docs/handbook/basic-types.html)。

> **tip:** 在学习了解 TypeScript 的内容时，最好自己去实践一下。

<!-- more -->

### 泛型

在软件程序开发设计中，为了提高程序有较好的可读性和健壮性，会将相似的逻辑进行集中统一处理，构建可复用的组件。同理在 TypeScript 中，我们可以利用 `泛型` 创建可重用的组件/数据类型等。

在 TypeScript 中，泛型支持：

- 泛型函数
- 泛型接口
- 泛型类

```
interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}
let myIdentity: GenericIdentityFn<number> = identity;
identity(1);
identity('a');
myIdentity(1);
// myIdentity('a'); // error!

class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 1;
// myGenericNumber.zeroValue = 'a'; // error!
```

#### 泛型约束

虽然在使用 `泛型` 中，如果我们知道要操作的数据具有那些属性，并希望进行相应操作的话，需要对类型变量 T 进行约束。这种情况下，可以通过定义一个接口来描述约束条件，并利用这个接口和 `extends` 关键字实现约束。

```
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);  // Error: T doesn't have .length
    return arg;
}

interface Lengthwise {
    length: number;
}
function loggingIdentity2<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}
loggingIdentity({length: 10, value: 3}); // ok
loggingIdentity2(3); // error
```

<!--可以传入任意类型数据，但是如果操作了 `泛型` 类型变量的属性防范-->

> **注意：**
>
> - 声明的泛型类型参数，可以被另一个类型参数所约束，例如下面获取对象属性的实例中，key

待补充
```
function getProperty(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
```

### 枚举

在编程过程中，为了便于代码阅读和后续维护。我们可以使用枚举清晰地表达意图，与其他内容加以区分。

TypeScript 支持数字和基于字符串的枚举。使用的时候可以通过访问枚举的属性/名字访问枚举成员。

```
// 数字枚举
enum Direction {
	Up = 1,
	Down,		// 等价于 Down = 2
	Left = 10,
	Right,		// 等价于 Right = 11
}

const test = 12;
enum E {
	A = test,
	B, // error: Enum member must have initializer. 即常量成员不允许紧随计算的成员
}

// 字符串枚举
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
```

> **需要注意的是：**
>
> - 数字枚举中，第一个成员默认为 0。其中未赋值的成员相对于之前有值的成员 **自增长**。
> - 如果在数字枚举中，利用计算的或者常量成员时，不允许不带初始化器的枚举（在正常的枚举里，没有初始化方法的成员被当成 **常数成员**）置于其后。
> - 与数字枚举不同的是，字符串枚举没有 **自增长行为**。
> - 在使用枚举的过程中，不建议使用 **异构枚举**（即混合数字和字符串的枚举）。
> - 枚举不同于接口，枚举是在 **运行时真正存在的对象**。
> - 在枚举中，除了可以通过枚举成员的名字去访问对应的枚举值，也能够通过枚举值 **反向映射** 到枚举名字。这是因为枚举类型会被编译成一个包含正向映射（name -> value）和反向映射（value -> name）的对象。
> - 在枚举上使用 `const` 修饰符的话，可以声明 **常量枚举**。常量枚举只能使用常量枚举表达式，并且不同于常规的枚举，它们在编译阶段会被删除。 常量枚举成员在使用的地方会被内联进来。 之所以可以这么做是因为，常量枚举不允许包含计算成员。
> - 多文件模块中，对于外部已经存在枚举，可以使用 **外部枚举** 用于描述已存在的枚举类型。


### 类型推论

在 TypeScript 中，对于没有明确指明类型的地方，类型推论会帮助提供类型。

在类型推论过程中，如果需要从表达式中推断类型，TypeScript 会使用这些表达式来推断出一个 **最佳通用类型**。除了表达式外，TypeScript类型推论也可能按照 **上下文** 进行推论。

```
let x = '2'; // x 被推断为字符串
let y: string = x + 1; // OK！ x 为字符串，计算后的结果也是字符串

let zoo = [new Rhino(), new Elephant(), new Snake()]; // zoo 没有找到最佳通用类型，被推断为联合数组类型 (Rhino | Elephant | Snake)[]
```

> 备注：
>
> 此处的内容理解得不是很清楚，感觉就是在说 TypeScript 会推论没有声明数据类型的地方，然后进行数据类型校验。


### 类型兼容性

**结构类型** 是一种只使用其成员描述类型的方式。TypeScript 使用结构类型系统的方式来描述。

TypeScript结构化类型系统的基本规则是：

- 如果 `x` 要兼容 `y`，那么 `y` 至少具有与 `x` 相同的属性。
- 当比较两个函数 `x` 和 `y` 时，首先会检查它们的参数列表，`x` 的每个参数必须能在 `y` 中找到对应类型的参数。（比较时只看类型不看参数名称，具体可看示例2）

```
interface Name {
    name: string;
}

class Person {
    name: string;
}

let p: Name;
p = new Person(); // ok

let y = { name: 'Alice', location: 'Seattle' };
p = y; // ok, 这个比较过程是递归进行的，检查每个成员及子成员
```

示例2：

```
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;

y = x; // OK
x = y; // Error
```


### 高级类型

常用的高级类型有：

- 交叉类型
- 联合类型
- 枚举类型
- `this`类型（在接口、类中，声明 `this` 返回，可用于链式调用场景）
- 索引类型


#### 交叉类型

在 TypeScript 中，交叉类型用于将多个类型合并为一个类型，使其包含所有类型的特性。

```
// 交叉类型
function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
        (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>second)[id];
        }
    }
    return result;
}

class Person {
    constructor(public name: string) { }
}
interface Loggable {
    log(): void;
}
class ConsoleLogger implements Loggable {
    log() {
        // ...
    }
}
var jim = extend(new Person("Jim"), new ConsoleLogger());
console.log(jim.name);
jim.log();
```

#### 联合类型

联合类型在使用上不同于交叉类型，其常用于表示一个值可以是多种类型之一。使用 `|` 分隔每个类型。如果一个值是联合类型，访问时只能访问此联合类型中所有类型的共有成员。

```
class UnionType {
	constructor (public type: string | number) {
		
	}
}
let ut: UnionType;
ut = new UnionType('hello');
ut.type.slice(1); // error

(<string>ut.type).slice(1);

function isString (type: string | number): type is string {
	return (<string> type).slice !== undefined;
}
if (isString(ut.type)) {
	ut.type.slice(1)
}

if (typeof ut.type === 'string') {
	ut.type.slice(1)
}
```

> 对于在联合类型中，希望访问该类型特有的成员，可以使用一下几种方法：
> - 如果明确知道了联合类型的具体类型，可以使用类型断言。
> - 可以使用类型谓词，谓词为 `parameterName is Type` 这种形式， `parameterName` 必须是来自于当前函数签名里的一个参数名。
> - `typeof` 类型保护：在 TypeScript 中，`typeof` 能被识别为一个类型保护。只有两种形式能被识别：`typeof v === "typename"` 和 `typeof v !== "typename"`， `"typename"` 必须是 `"number"`， `"string"`， `"boolean"` 或 `"symbol"`。 但是TypeScript并不会阻止你与其它字符串比较，语言不会把那些表达式识别为类型保护。
> - `instanceof` 类型保护：类似于 `typeof`类型保护，TypeScript 会将其细化为其构造签名。


#### 类型别名

类型别名会给一个类型起个新名字。 类型别名有时和接口很像，但是可以作用于原始值，联合类型，元组以及其它任何你需要手写的类型。

> 个人感受：
>
> 类型别名最好配合联合类型或是交叉类型使用。

```
type Name = string;
type NameResolver = () => string;
type NameOrResolver = nu | NameResolver;
```

> 类型别名和接口区别：
>
> - 接口创建了新名称，可以在其它任何地方使用，而类型别名并没有创建新名字。
> - 类型别名不能被 extends和 implements
> - 接口不能用来描述一个联合类型或是元组类型


#### 索引类型

在 TypeScript 中可以通过，**索引类型查询** （`keyof T`） 和 **索引访问 操作符**（`T[K]`）进行类型判断处理。

> 新版本貌似去掉了 keyof 关键词

```
function pluck<T, K extends keyof T>(o: T, names: K[]): T[K][] {
  return names.map(n => o[n]);
}

interface Person {
    name: string;
    age: number;
}
let person: Person = {
    name: 'Jarid',
    age: 35
};
let strings: string[] = pluck(person, ['name']); // ok, string[]
```

### Symbols

自 ECMAScript 2015 起，`symbol` 成为了一种新的原生类型，就像 `number` 和 `string` 一样。

Symbols 是不可改变且唯一的。同时 Symbols 也可以用做对象的键值。在 ECMAScript 目前无私有属性的情况，下也用于定义私有属性。

```
let sym2 = Symbol("key");
let sym3 = Symbol("key");

sym2 === sym3; // false, symbols是唯一的

const name = Symbol()
```

事实上，除了用户自定义的 symbol，语言内部也内置了一些 symbol 行为。其中 `for..of` 会遍历可迭代的对象，调用对象上的 `Symbol.iterator` 方法。

> 需要注意的是：
>
> 当生成目标为ES5或ES3，迭代器只允许在Array类型上使用。 在非数组值上使用 for..of语句会得到一个错误，就算这些非数组值已经实现了Symbol.iterator属性。