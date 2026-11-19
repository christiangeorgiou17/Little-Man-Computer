# Assembler

`Assembler` is a class that converts a list of `Instruction` objects into machine code stored in the `MEMORY` array. See [Instruction Information](/docs/instructiongenerator/Instruction.md) and [MEMORY Information](/docs/assembler/MEMORY.md).

## Methods

### **constructor**

The initialisation of the `Assembler` class, taking a list of `Instruction` objects as a parameter.

#### Parameters

* **`instructions`**: The source list of assembly instructions, represented as a list of `Instruction` objects.

#### Attributes

* **`this.position`**: An integer representing the location of the element in `this.instructions` that is to be translated into machine code. It is initialised to `-1` and advanced immediately in the constructor.
* **`this.currentInstruction`**: The element at `this.position` in `this.instructions`. It is initially set to `null`.

### **advance**

This method increments `this.position` by one to select the next instruction in `this.instructions`. Before assigning the new value to `this.currentInstruction`, it checks whether the position is valid. If the position is greater than or equal to the length of `this.instructions`, `this.currentInstruction` is set to `null`; otherwise, it is set to the element at that index.

### **format**

A static function that formats a numerical value as a string containing the requested number of digits.

#### Parameters

* **`value`**: An integer representing a memory location or data value.
* **`places`**: The length of the formatted string. This defaults to `3` when no value is provided.

#### Outputs

* A string representation of `value`, padded with leading zeros until it has the requested length.

### **findMemoryLocation**

A function that uses a linear search to determine the memory location associated with a symbolic address.

#### Parameters

* **`symbolicAddress`**: The identifier whose memory location is being searched for.
* **`mode`**: Either `"VAR"` or `"BRANCH"`, specifying whether the address is associated with a variable or a branch label.

#### Outputs

* The `memoryLocation` of the matching `Instruction` object. For a branch address, it searches for an instruction whose `branchFrom` label matches `symbolicAddress`. For a variable address, it searches for an `AssignmentInstruction` whose `variable` matches `symbolicAddress`.

### **convert**

The `convert` method iterates through `this.instructions` while `this.currentInstruction` is not `null`. It checks the class of each instruction and converts it into a three-character decimal machine-code string before storing it in the appropriate location in `MEMORY`.

System instructions are stored directly using `INSTRUCTION_TABLE`. Assignment instructions store their value using `Assembler.format`. Branch instructions use `findMemoryLocation` to find the labelled memory location and combine it with the branch instruction code. Operator instructions use `findMemoryLocation` to find the associated variable's memory location and combine it with the operator instruction code.