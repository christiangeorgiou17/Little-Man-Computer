# InstructionGenerator

`InstructionGenerator` is a class used for collating a list of `Token` objects into a list of `Instruction` objects. See [Token Information](/docs/lexer/Token.md) and [Instruction Information](/docs/instructiongenerator/Instruction.md).

## Methods

### **constructor**

The initialisation of the class `InstructionGenerator`, taking a list of `Token` objects as a parameter.

#### Parameters

* **`tokenList`**: The source list of assembly code tokens represented as a list of `Token` objects.

#### Attributes

* **`this.position`**: An integer value determining the location of the element in `this.tokenList` that is to be used to create `Instruction` objects. It is initialised to `-1` and then advanced immediately in the constructor.
* **`this.currentData`**: The element at the position of `this.position` in `this.tokenList`. Initially set to `null`.

### **advance**

This method increments `this.position` by one in order to generate the next instruction using the next element in `this.tokenList`. Before assigning the new value to `this.currentData`, the current position is checked for validity. If it is greater than or equal to the length of `this.tokenList`, `this.currentData` is set to `null`; otherwise, it is set to the element at the `this.position` index of `this.tokenList`.

### **checkIndex**

This method checks whether an index is valid in `this.tokenList`.

#### Parameters

* **`index`**: The index to be checked.

#### Outputs

* **`true`**: Returns `true` if the index satisfies `0 <= i < length`.
* **`false`**: Returns `false` if the index does not satisfy the inequality above.

### **chooseInstructionType**

A static function used to determine which `Instruction` subclass should be appended to an instruction list using token information.

#### Parameters

* **`tokenList`**: The list of [`Token`](/docs/lexer/Token.md) objects used to create the [`Instruction`](/docs/instructiongenerator/Instruction.md).
* **`instruction`**: The specific instruction, represented as a `String`. It could take the values of any of the instructions listed in [`INSTRUCTIONS`](/docs/instructiongenerator/INSTRUCTIONS.md).
* **`memoryLocation`**: The location in `MEMORY` where the instruction is stored.

#### Outputs

The function returns a new instance of an `Instruction` object initialised with the passed values. The subclass is determined by comparing the `instruction` value against the relevant lists in [`INSTRUCTIONS`](/docs/instructiongenerator/INSTRUCTIONS.md).

### **generate**

Two lists are initialised: `instructionList` and `currentInstruction`. These store the generated `Instruction` objects and the related `Token` objects respectively. The list of `Token` objects is iterated over using `this.currentData`. If the current data is `"Error"`, then `"Error"` is pushed to `instructionList` and the loop ends. The list `currentInstruction` receives `Token` objects whose token types are `"VAR"` or `"NUM"` as the first check. A second check is then performed for system instructions: the current data is pushed to `currentInstruction`, and `InstructionGenerator.chooseInstructionType` is used to determine which `Instruction` object should be created. That object is then appended to `instructionList`, and `currentInstruction` is cleared. The same process is repeated for `"DAT"`, with additional checks to account for assignments that may not include a value and therefore default to `0`. Otherwise, when the token type is `"INST"`, the same logic is applied. If none of the expected cases match, an `"Error"` value is added to `instructionList`. After all checks, `this.advance()` is called to move to the next value.

#### Outputs

The method returns `instructionList`, which is a list of `Instruction` objects.