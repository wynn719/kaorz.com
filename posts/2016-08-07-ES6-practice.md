---
title: ES6实践（一）
layout: post
tag:
- JavaScript

categories:
- tech

excerpt: 学习过ES6有一段时间了，新语法很多，记不牢，故编写该文章，主要整理下ES6中一些实战中比较有用的例子。这是该系列的第一篇。
---

> 具体的ES6语法，可以参考阮一峰老师写的<a href="http://es6.ruanyifeng.com/">《ECMAScript 6入门》</a>。
> 该文章只整理一些实战中很有用的例子。

## let&const

### let块级作用域变量声明

`let`基本修复了以往`var`声明的弊端——变量全局污染，变量声明只在块级作用域中有效，不可重复声明，ES6同时新增了新的块级作用域`{}`，一些实用的例子如下：

**1.代替原有的闭包创建的块级作用域**

```javascript
{
    // code
}

// 代替IIFE写法
(function() {
    // code
}());
```

**2.解决for循环索引变化问题**

```javascript
// 循环结束i被垃圾回收
for (let i = 0; i < 6; i++) {}

// 循环结束i的值为5
for (var i = 0; i < 6; i++) {}
```

### const常量声明

`const`解决了没有常量定义的问题，定义后的常量不能在修改，不可重复声明，同样的，常量声明只在块级作用域中有效，实用例子很简单：

```javascript
const URL = 'http://www.google.com';

// 代替一直写js文件最开头的变量模仿常量
window.URL = 'http://www.google.com';
```

### 需要注意的问题

`let`声明的变量不属于`window`的属性

```javascript
let foo = 123;
console.log(window.foo); // undefined
```

## 变量解构赋值

解构可以理解为从指定的数组或者对象中提取数组元素或者对象属性的值，然后赋值到指定变量中，实用的例子：

### 变量快速交换

```javascript
// 交换x和y的值
let x = 1, y = 2, z = 3;
[x, y, z] = [z, x, y]; // 3 1 2
```

### 函数的默认赋值

```javascript
let fn = function({
        foo = 1,
        bar = 'foo',
        hello = false
    }) {
    console.log(foo);
    console.log(bar);
    console.log(hello);
};
fn({}); 
// 1
// foo
// false
```

### 遍历Map结构

```javascript
for (let [key, value] of map) {
    console.log(key + '=>' value);
}
```

### 模块快速解析

```javascript
// ES6的模块语法
import {selector, spinner} from 'Bootstrap.js'
// require.js
const { SourceMapConsumer, SourceNode } = require("source-map");
```

## 字符串的扩展

ES6添加很多对`String`的扩展（本质上是修补语法）

### includes(), startsWith(), endsWith()

都支持搜索起始位置的设置，`startsWith()`查询参数字符是否在源字符串的头部，`endsWith()`查询参数字符是否在源字符串的尾部

```javascript
'hello world'.includes('wor'); // true
// 代替语意不明确的indexOf
'hello world'.indexOf('wor') !== -1;
```

### 模板字符串

新的模板字符串功能可以使html片段的引入更加美观与规范，嵌入的变量名的形式为`${var}`，大括号中支持js的语法，实用的例子：

```javascript
let basket = {count: 1, onSale: 'iPhone'};
// 模板字符串，空格和缩进都会被保留
$('#result').append(`
    There are <b>${basket.count}</b> items
    in your basket, <em>${basket.onSale}</em>
    are on sale!
    <p>${basket.count + basket.add}</p>
`);

// 代替传统的html字符串
$('#result').append(
    'There are <b>' + basket.count + '</b> ' +
    'items in your basket, ' +
    '<em>' + basket.onSale +
    '</em> are on sale!'
);
```

## 数值的扩展

ES6添加很多对`Number`的扩展（本质上还是修补语法），对`Math`对象也添加了很多实用的函数

### Number.isFinite(), Number.isNaN(), Number.isInteger()

ES6之前对`Infinity`, `NaN`, 整型的定义不明确，没有对应的检测方法，ES6添加了相应的检测方法，比较简单，不做示例

### 常用的Math方法

```javascript
// 去除小数部分，返回整数部分
Math.trunc(5.333); // 5
// 判断是否为正数，负数，0
// 参数为正数，返回+1；
// 参数为负数，返回-1；
// 参数为0，返回0；
// 参数为-0，返回-0;
// 其他值，返回NaN。
Math.sign(-5) // -1
```

## 数组的扩展

ES6对数组做了很多实用的扩展，实用的例子如下：

### 将类似数组的对象转换为数组

**1.`Array.from()`可以将具有隐性的数组属性的对象转换为真正的数组，例如jQuery返回的`Dom`对象，原生js的`NodeList`对象**

```javascript
// 转换arguments
let fn = function() {
    var args = Array.from(arguments);
}
// 转换NodeList
let lis = document.querySelectorAll('li');
let arrLis = Array.from(lis);
arrLis.forEach(function() {}); // 数组才能实用forEach
```

**2.使用拓展符也可以达到这种效果**

```javascript
// 转换arguments
let fn = function() {
    var args = [...arguments];
}
// 转换NodeList
let arrLis = [...document.querySelectorAll('li')];
arrLis.forEach(function() {}); // 数组才能实用forEach
```

**3.快速组合数组**

`Array.of()`可以快速的将变量或者常量进行组合，返回新的数组

```javascript
let x = 'wynne', y = 'zheng';
console.log(Array.of(x, y)); // ['wynne', 'zheng']
```

### 更丰富的查找功能find()&findIndex()，includes()

**1.`find()`可以通过回调函数进行数组过滤，返回该成员，`findIndex()`返回索引**

```javascript
let arr = [1, 2, 3, 4, 5];
// ES6（需要注意该方法IE的支持性不怎么好）
let item = arr.find(function(value, index, arr) {
    if (value > 3) {
        return true;
    }
});
// 传统查找
let item;
arr.forEach(function() {
    if (value > 3) {
        item = value;
        return;
    }
});
```

**2.`includes()`代替语意差的`indexOf`**

```javascript
let arr = [1, 2, 3, 4, 5];
arr.includes(3); // true
arr.indexOf(3) !== -1; // true
```

*未完待续*
