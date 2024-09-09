---
layout: post
title: 百度ife-javascript构造函数学习笔记
categories:
  - tech

tags:
  - 笔记
  - ife
  - task0003

time: 2015-06-25 07:15:00
excerpt: 深入学习javascript的构造函数，同时记录在学习中遇到的问题。
---

### constructor 是什么

当我们创建一个构造函数时，就会创建一个 constructor 的属性

```javascript
function Foo() {
  this.name = "Jimmy";
}

// 实例化对象
var foo = new Foo();

console.log(Foo.constructor); // Function()
console.log(Foo.prototype.constructor === Foo); // true
console.log(foo.constructor); // Foo()
console.log(foo.constructor === Foo); // true
```

由于 Foo 本身是由 Function 创建的，所以 Foo 的 constructor 就自然而然的指向了 Function()，而 foo 是由 Foo()创建的，所以 foo 的 constructor 就指向了 Foo，即 constructor 默认指向创建自己的函数。

要注意的是，Foo.prototype.constructor 也指向 Foo，其实就是一个循环引用,Foo 的 prototype 属性指向 Foo 的原型，然后 Foo 的原型的 constructor 属性指向 Foo

即：Foo.prototype -> Foo 原型，Foo 原型的 constructor -> Foo

### constructor 在使用中应该注意的

要知道 constructor 一直都是指向创建当前对象的构造函数的，但是，在以下代码中，constructor 被修改了，而可能编码的人根本不知道~

```javascript
function Person(name) {
  this.name = name;
}
console.log(Person.prototype.constructor); //   Person

var p1 = new Person("Jimmy"); //    Person
console.log(p1.constructor); // Object

// 像这样，其实重新定义了prototype
Person.prototype = {
  sayName: function () {
    console.log(this.name);
  },
};

console.log(Person.prototype.constructor); // Object

var p2 = new Person("Jimmy");
console.log(p2.constructor); // Object
console.log(p2.constructor === Object); // true
console.log(Person.prototype.constructor === Object); // true
console.log(p2.constructor.prototype.constructor === Object); // true
```

说好的 p2 是 Person 创建的，可是此时 p2 却指向了 Object，其实是因为这一行的问题：

```javascript
Person.prototype = {
    ...
};
```

这等价于：

```javascript
Person.prototype = new Object({
   ...
});
```

此时，Person.prototype 变成了由 Object 构造的，而 Person.prototype.constructor 也指向了创建自己的对象，即 Object。这时候就肯定不对头了~

修正的方法也很简单，就是让 Person.prototype.constructor 重新指向 Person:

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype = {
  sayName: function () {
    console.log(this.name);
  },
};

Person.prototype.constructor = Person;
var p = new Person("Jimmy");
console.log(p.constructor === Person); // true
console.log(Person.prototype.constructor === Person); // true
console.log(p.constructor.prototype.constructor === Person); // true
```

这下也就没问题了吧~

---

不仅在创建对象的时候要注意，在做继承(这里的继承方式不是最好的，只是为了示例)的时候也要注意：

```javascript
function Person(name) {
  this.name = name;
}

// 这种并不会重写constructor
Person.prototype.sayName = function () {
  console.log(this.name);
};

// 新建一个子类
function Student(job) {
  Person.call(this, name);
  this.job = job;
}

// 原型链继承，注意此时prototype也被修改了，
// constructor也难幸免
Student.prototype = Person.prototype;

console.log(Student.prototype.constructor === Student); // false
console.log(Student.prototype.constructor === Person); // true

// 赶快修正回来！
Student.prototype.constructor = Student;

console.log(Student.prototype.constructor === Student); // true
console.log(Student.prototype.constructor === Person); // false

var s = new Student("Jimmy", "student");
s.sayName(); // Jimmy
```

总结：在进行面向对象编程时，要及时修正 constructor 的指向，防止混乱
