### 1. What is the difference between var, let, and const?
Ans: In JavaScript, we use var, let, and const to declare variables. The var keyword is old, and it is function-scoped. It can be declared many times and can also be updated, but it sometimes creates problems because of hoisting. The let keyword is block-scoped. It cannot be declared again in the same block, but its value can be updated. The const keyword is also block-scoped. It cannot be declared again or updated. However, if it stores an object or array, the values inside can still be changed.

### 2. What is the difference between map(), forEach(), and filter()?
Ans: The map() method goes through every element of an array and creates a new array with changed values. The forEach() method also goes through the array but does not return anything; it is only used to perform actions like printing. The filter() method creates a new array with only those elements that match a condition. In short, map() changes values, forEach() only runs code, and filter() selects values.

### 3. What are arrow functions in ES6?
Ans: Arrow functions are a shorter way to write functions. They use the => symbol. Unlike normal functions, arrow functions do not have their own this. They take this from the surrounding code. They are mostly used for small functions or callbacks.

### 4. How does destructuring assignment work in ES6?
Ans: Destructuring helps us take values from arrays or objects and store them in variables quickly. For example, instead of writing many lines to get values, we can use one line with destructuring. This makes the code short and easy to read.

### 5. Explain template literals in ES6. How are they different from string concatenation?
Ans: Template literals are a new way to write strings using backticks (`). We can put variables inside a string using ${}. Unlike normal string concatenation, we do not need to use +. Template literals also support writing strings in multiple lines easily. This makes the code cleaner and more readable.






