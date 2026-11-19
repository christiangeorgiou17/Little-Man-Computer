# Token

`Token` is a class that represents a single unit of code.

## Methods

### **constructor**

The initialisation of the class `Token`, taking one or two parameters.

#### Parameters

* **`tokenType`**: The type of token this unit is; it could be `"VAR"` for symbolic address, `"INST"` for assembly instruction, or `"NUM"` for a numerical value, referencing an address. This will always be a `String`.
* **`value`**: The value of the token, this could be the name of the instruction or symbolic address. This would be of type `String` or `Number`.

### **toString**

A string representation of a `Token` object.

#### Output

* A `String` containing information about the `Token` instance, including the `tokenType` and `value` if value is not null.

## Use case

During lexical analysis, the [`Lexer`](/docs/lexer/Lexer.md) creates multiple `Token` objects based on the inputted text.

