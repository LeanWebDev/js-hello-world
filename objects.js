let user = new Object(); // "object constructor" syntax
let user = {}; // "object literal" syntax
let user = {
  // an object
  name: "John", // by key "name" store value "John"
  age: 30, // by key "age" store value 30
};
// get property values of the object:
console.log(user.name); // John
console.log(user.age); // 30
user.isAdmin = true;
delete user.age;
let user = {
  name: "John",
  age: 30,
  "likes birds": true, // multiword property name must be quoted
};
let user = {
  name: "John",
  age: 30, // The last property in the list may end with a comma: T
  // That is called a “trailing” or “hanging” comma.
  //Makes it easier to add/remove/move around properties, because all lines become alike.
};
// There’s an alternative “square bracket notation” that works with any string:
let user = {};

// set
user["likes birds"] = true;

// get
console.log(user["likes birds"]); // true

// delete
delete user["likes birds"];

// Square brackets also provide a way to obtain the property name as the result of any expression
// – as opposed to a literal string – like from a variable as follows:
let key = "likes birds";

// same as user["likes birds"] = true;
user[key] = true;

let user = {
  name: "John",
  age: 30,
};

let key = prompt("What do you want to know about the user?", "name");

// access by variable
alert(user[key]); // John (if enter "name")

/* Computed properties */
let fruit = prompt("Which fruit to buy?", "apple");

let bag = {
  [fruit]: 5, // the name of the property is taken from the variable fruit
};

alert(bag.apple); // 5 if fruit="apple

let fruit = "apple";
let bag = {
  [fruit + "Computers"]: 5, // bag.appleComputers = 5
};

/* Property value shorthand */

function makeUser(name, age) {
  return {
    name: name,
    age: age,
    // ...other properties
  };
}

let user = makeUser("John", 30);
alert(user.name); // John

function makeUser(name, age) {
  return {
    name, // same as name: name
    age, // same as age: age
    // ...
  };
}

// We can use both normal properties and shorthands in the same object:
let user = {
  name, // same as name:name
  age: 30,
};

/* Property names limitations */

// As we already know, a variable cannot have a name equal to one of language-reserved words
// like “for”, “let”, “return” etc. But for an object property, there’s no such restriction:
// EXCEPT for __proto__

// these properties are all right
let obj = {
  for: 1,
  let: 2,
  return: 3,
};

alert(obj.for + obj.let + obj.return); // 6

// Other types are implicitly converted to strings

let obj = {
  0: "test", // same as "0": "test"
};

// both alerts access the same property (the number 0 is converted to string "0")
alert(obj["0"]); // test
alert(obj[0]); // test (same property)

/* Property existence test, “in” operator */

let user = {};

alert(user.noSuchProperty === undefined); // true means "no such property"

// There’s also a special operator "in" for that.

"key" in object;

// For instance

let user = { name: "John", age: 30 };

alert("age" in user); // true, user.age exists
alert("blabla" in user); // false, user.blabla doesn't exist

// Why does the in operator exist? Isn’t it enough to compare against undefined?
// Well, most of the time the comparison with undefined works fine.
// But there’s a special case when it fails, but "in" works correctly.
// It’s when an object property exists, but stores undefined:

let obj = {
  test: undefined,
};

alert(obj.test); // it's undefined, so - no such property?

alert("test" in obj); // true, the property does exist!

/* The “for…in” loop */
for (key in object) {
  // executes the body for each key among object properties
}
let user = {
  name: "John",
  age: 30,
  isAdmin: true,
};

for (let key in user) {
  // keys
  alert(key); // name, age, isAdmin
  // values for the keys
  alert(user[key]); // John, 30, true
}

/* Integer properties */

// The “integer property” term here means a string that can be converted to-and-from an integer without a change.
// So, “49” is an integer property name, because when it’s transformed to an integer number and back,
// it’s still the same. But “+49” and “1.2” are not:

// Math.trunc is a built-in function that removes the decimal part
alert(String(Math.trunc(Number("49")))); // "49", same, integer property
alert(String(Math.trunc(Number("+49")))); // "49", not same "+49" ⇒ not integer property
alert(String(Math.trunc(Number("1.2")))); // "1", not same "1.2" ⇒ not integer property

/* Ordered like an object */

// Are objects ordered? In other words, if we loop over an object,
// do we get all properties in the same order they were added? Can we rely on this?
// The short answer is: “ordered in a special fashion”: integer properties are sorted,
// others appear in creation order. The details follow.
// As an example, let’s consider an object with the phone codes:

let codes = {
  49: "Germany",
  41: "Switzerland",
  44: "Great Britain",
  // ..,
  1: "USA",
};

for (let code in codes) {
  alert(code); // 1, 41, 44, 49
}

/* Objects by reference */
let user = { name: "John" };

let admin = user; // copy the reference, not the value

admin.name = "Pete"; // changed by the "admin" reference

alert(user.name); // 'Pete', changes are seen from the "user" reference

/* Comparisons by reference */
let a = {};
let b = a; // copy the reference

alert(a == b); // true, both variables reference the same object
alert(a === b); // true

// Now, two different objects with same data
let a = {};
let b = {}; // two independent objects

alert(a == b); // false

// Side effect: const declarations do not protect properties as long as the reference value is unchanged

const user = {
  name: "John",
};

user.name = "Pete"; // (*)

alert(user.name); // Pete

// Solvable with property flags and descriptors

/* Cloning and merging, Object.assign */

// Normally copying by reference will be sufficient, but in
// times where it is necessary to perform a copy of contents, this is how

// Method 1: iterate at primitive property level

let user = {
  name: "John",
  age: 30,
};

let clone = {}; // the new empty object

// let's copy all user properties into it
for (let key in user) {
  clone[key] = user[key];
}

// now clone is a fully independent object with the same content
clone.name = "Pete"; // changed the data in it

alert(user.name); // still John in the original object

// Method 2: use in-built method Object.assign()
//Object.assign(dest, [src1, src2, src3...])

let user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };

// copies all properties from permissions1 and permissions2 into user
Object.assign(user, permissions1, permissions2);

// now user = { name: "John", canView: true, canEdit: true }

// Existing values get overriden
let user = { name: "John" };

Object.assign(user, { name: "Pete" });

alert(user.name); // now user = { name: "Pete" }

// Can replace the need to iterate through objects with let

let user = {
  name: "John",
  age: 30,
};

let clone = Object.assign({}, user);

// Can also use spread syntax

/* Nested cloning */

// If object contains objects
// With current technique, it will just copy the object reference
// Hence it changes made will be shared

let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50,
  },
};

let clone = Object.assign({}, user);

alert(user.sizes === clone.sizes); // true, same object

// user and clone share sizes
user.sizes.width++; // change a property from one place
alert(clone.sizes.width); // 51, see the result from the other one

// To fix that, we should use a cloning loop that examines each value
// of user[key] and, if it’s an object, then replicate its structure
// as well. That is called a “deep cloning”.

// We can use recursion to implement it. Or, to not reinvent the wheel,
// take an existing implementation, for instance _.cloneDeep(obj) from
// the JavaScript library lodash.
