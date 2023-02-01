---
layout: post
title: 百度ife-javascript原型学习笔记
categories: 
- tech

tags: 
- 笔记
- ife
- task0003

time: 2015-06-23 22:15:00
excerpt: 深入学习javascript的原型和原型链，同时记录在学习中遇到的问题。

---

> 学习任务来自：<a href="https://github.com/baidu-ife/ife" rel="no-follow">百度ife前端技术学院</a>
> 
> 学习资料参考自：
> 
> <a href="http://www.nowamagic.net/librarys/veda/detail/1648" rel="no-follow">JavaScript探秘：强大的原型和原型链</a>
> 
> <a href="http://blog.jobbole.com/9648/" rel="no-follow">理解JavaScript原型</a>
> 
> <a href="http://www.cnblogs.com/wangfupeng1988/p/3977924.html" rel="no-follow">深入理解javascript原型和闭包</a>
> 

个人注：主要是区分`Prototype`,`prototype`,`__proto__`,`[[Prototype]]`，理解`constructor`

* `Prototype`：原型本尊
* `prototype`：原型属性，指向`Person`，实例中不存在
* `__proto__`：原型访问器，指向 **创造该对象** 的原型
* `[[Prototype]]`：等同于`__proto__`
* `constructor`：构造函数，指向函数本身（如new Person)，`constructor.prototype`也指向`Prototype`


## javascript原型和原型链

### 对象中的__proto__属性（隐式原型，javascript并不希望我们访问到该属性）

每当创建一个对象，该对象就会有一个`__proto__`属性，该属性指向创建该对象的函数的原型

如下代码中：

```javascript
var foo={
    x: 10,
    y: 20
}
``` 

当我们创建了一个foo对象，foo对象的`__proto__`属性就会指向foo的原型`Prototype`；同时foo的`Prototype`也是一个对象，它也有`__proto__`，指向`Object.prototype`；在同时，`Object.prototype`的`__proto__`指向`null`。因此，可以说是个对象就有`__proto__`属性！

而且，对象是沿着`__proto__`这条原型链来走的！！！

### constructor属性

```javascript
function Foo(y){ 
    this.y = y ; 
} 

Foo.prototype.x = 10; 

Foo.prototype.calculate = function(z){ 
    return this.x+this.y+z; 
}; 

var b = new Foo(20); 

alert(b.calculate(30)); 
```  

此时，Foo.prototype有一个`constructor`属性，指向Foo对象

### 原型

* 原型是一个对象，其他对象可以通过它实现属性继承。
* 任何一个对象都可以成为原型
* 所有的对象在默认的情况下都有一个原型，因为原型本身也是对象，所以每个原型自身又有一个原型(只有一种例外，默认的对象原型在原型链的顶端。

一个对象的真正原型是被对象内部的[[Prototype]]属性(property)所持有。ECMA引入了标准对象原型访问器Object.getPrototype(object)，到目前为止只有Firefox和chrome实现了此访问器。除了IE，其他的浏览器支持非标准的访问器`__proto__`，如果这两者都不起作用的，我们需要从对象的构造函数中找到的它原型属性。下面的代码展示了获取对象原型的方法：

```javascript
var a = {}; 

//Firefox 3.6 and Chrome 5 
Object.getPrototypeOf(a); //[object Object]   
 
 
//Firefox 3.6, Chrome 5 and Safari 4 
a.__proto__; //[object Object]   

//all browsers 
a.constructor.prototype; //[object Object]
``` 

因此，不难理解，`__proto__` 就是指向对象的原型，而不支持`__proto__`访问器的，`constructor` 的原型指向对象的原型

当试图用基本类型访问原型时，内部发生了强制转换：

```javascript
//(works in IE too, but only by accident) 
 
string.__proto__ === String().__proto__; //true
``` 

因此，基本类型没有原型的说法是正确的

### instanceof 的工作原理

如下代码中：

```javascript
function Foo(){ }
var f1 = new Foo();

console.log(f1 instanceof Foo); // true
console.log(f1 instanceof Object); //true
``` 

在使用instanceof时，其内部的工作时这样的：

* 沿着`f1.__proto__`这条链向上找
* 沿着`Foo.prototype`这条链向上找
* 当两条线找到同一个引用，返回true，如果到终点还未重合，sorry，返回false

### hasOwnProperty的由来

```javascript
var Person = function(){
    this.name = 'wynne';
};

Person.prototype.sayName = function(){
    alert(this.name);
};

var person = new Person();

person.sayHello = function(){
    alert('hello');
};

var item;
for(item in person){

    // 如果不加 hasOwnProperty，会遍历出prototype上的sayName
    if(person.hasOwnProperty(item)) {
        console.log(item);
    }
}
``` 

如上所述的，`person`里本来是没有 `hasOwnProperty` 属性的，它其实是由 `Object.prototype` **继承**而来的!

对象沿着`__proto__`这条原型链来查找！！！

`person`的`__proto__`属性指向`Person`的原型，而`Person`的原型的`__proto__`属性又指向创建它的`Object`的原型，而`Object`的原型上就有这个方法~

### 原型继承

#### 原型继承的好处

如果仅仅只是因为一个实例而使用原型是没有多大意义的，这和直接添加属性到这个实例是一样的。

原型真正魅力体现在多个实例共用一个通用原型的时候。原型对象(注:也就是某个对象的原型所引用的对象)的属性一旦定义，就可以被多个引用它的实例所继承(注:即这些实例对象的原型所指向的就是这个原型对象)，这种操作在性能和维护方面其意义是不言自明的。

#### 构造函数

构造函数提供了一种方便的跨浏览器机制，这种机制 **允许在创建实例时为实例提供一个通用的原型**

javascript中构造函数(constructor)也是一个函数，因此也是一个对象，自然就有了原型属性(与原型区分开来)。

```javascript
//function will never be a constructor but it has a prototype property anyway 
 
Math.max.prototype; //[object Object] 
 
//function intended to be a constructor has a prototype too 
var A = function(name) { 
     this.name = name; 
} 
 
A.prototype; //[object Object]   
 
//Math is not a function so no prototype property 
Math.prototype; //null
``` 

原型属性只存在于函数上，而不存在与实例上：

```javascript
var A = function(){
    this.name = 'wynne';
};

console.log(A.prototype); // A

var a = new A();

console.log(a.prototype); // undefined
``` 

函数A的原型属性(prototype property)是一个对象，当这个函数被用作构造函数来创建实例时，该函数的 **原型属性** 将被作为 **原型** 赋值给 **所有对象实例** (注:即所有实例的原型引用的是函数的原型属性)

注意：一个函数的原型属性(function’s prototype property)其实和实际的原型(prototype)没有关系

```javascript
//(example fails in IE) 
 
var A = function(name) { 
  this.name = name; 
};
 
A.prototype == A.__proto__; //false 
 
A.__proto__ == Function.prototype; 
//true - A's prototype is set to its constructor's prototype property
``` 

如果我现在替换A的原型属性为一个新的对象，实例对象的原型`a.__proto__`却仍然引用着原来它被创建时A的原型属性

```javascript
var A = function(name) {
    this.name = name;
}  
var a = new A('alpha');
a.name; //'alpha'   
A.prototype = {x:23};
a.x; //null
``` 

如果在实例被创建之后，改变了函数的原型属性所指向的对象，也就是改变了创建实例时实例原型所指向的对象

#### 拓展已有的对象

拓展已有对象的方式本身是不推荐的，如果真的需要对内置对象的原型进行拓展，检测该属性是否存在应该是代码第一件要做的事情！

```javascript
// 特性检测
if( String.prototype.timers ){
    String.prototype.times = function(count) {
        return count < 1 ? '' : new Array(count + 1).join(this);
    } 
}
 
"hello!".times(3); // "hello!hello!hello!"; 
 
"please...".times(6); // "please...please...please...please...please...please..."
``` 

#### 原型通过原型链来继承

原型的继承机制是发生在内部且是隐式的.当想要获得一个对象a的属性foo的值，javascript会在原型链中查找foo的存在，如果找到则返回foo的值，否则undefined被返回。


