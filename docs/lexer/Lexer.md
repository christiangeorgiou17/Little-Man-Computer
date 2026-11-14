# Lexer

`Lexer` is a class used for lexical analysis of the inputted assembly code text.

## Methods

### **constructor**

The initialisation of the class `Lexer`, taking text as a parameter.

#### Parameters

* **`text`**: The source text of assembly code represented as a `String`.

#### Attributes

* **`this.textList`**: A list of `String` created after splitting `this.text` based on whitespace (` `, `\n`, `\t`)
* **`this.position`**: An integer value determining the location of the element in `this.textList` that is to be tokenised. Initialised to -1 at the start, but is advanced in `constructor` immediately afterwards.
* **`this.current_data`**: The element at the position of `this.position` in `this.textList`. Initially set to null.

### **advance**

This method increments `this.position` by one in order to tokenise the next element in `this.textList`. Before assigning the new value to `this.current_data`, the value in `this.position` is checked to be valid. It is invalid if it is greater than or equal to the length of the list, `this.textList` and would set `this.current_data` to null, otherwise sets it to the element at the `this.position` index of `this.textList`.

### **tokenise**

This method uses `this.textList` to create a list of `Token` objects that would later be used to determine each instruction, etc. It starts by defining `tokenList` as an empty list and iterates over `this.textList` using the value of `this.current_data` until invalid. Tokens can be created with three different token types ([Token Information](/docs/lexer/Token.md)). If `this.current_data` is within the `INSTRUCTIONS` global list imported from ```./instructiongenerator.js```, then a `Token` object with the type, `"INST"` is pushed to the list with the value of `this.current_data`. If the value is numeric, a `Token` object with type, `"NUM"` is pushed with the value of `this.current_data` stored as a `Number`. Otherwise, a `Token` with the type, `"VAR"` is pushed with the value of `this.current_data`; this would include all labels and symbolic addresses - they will be differentiated in a later stage.

#### Output

* The output of this method is a list of the same length as `this.textList`, where each element is a `Token` objects.