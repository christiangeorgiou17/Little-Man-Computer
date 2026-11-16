# Instruction

The base class for all instruction classes used to represent an LMC assembly instruction. It stores the instruction type and any labels, symbolic addresses, and related data.

## Methods

### **constructor**

The initialisation of the `Instruction` class, taking three parameters.

#### Parameters

* **`tokenList`**: The list of [`Token`](/docs/lexer/Token.md) objects used to create the `Instruction`. This information is used to determine the values of other attributes.
* **`instruction`**: The specific instruction, represented as a `String`. It could take the values of any of the instructions listed in [`INSTRUCTIONS`](/docs/instructiongenerator/INSTRUCTIONS.md).
* **`memoryLocation`**: The location in `MEMORY` where the instruction is stored.

### **toString**

A string representation of an `Instruction` object.

## BranchInstruction

The class used to represent branch instructions.

```js
class BranchInstruction extends Instruction
```

- More information on instructions is available in [docs/instructiongenerator/INSTRUCTIONS.md](docs/instructiongenerator/INSTRUCTIONS.md) and [README.md](README.md)

### Attributes

* **`this.branchTo`**: The `Token` in `this.tokenList` representing the symbolic address to which the instruction branches or jumps.
* **`this.branchFrom`**: The `Token` in `this.tokenList` representing the label associated with this instruction, if one exists; otherwise `null`.

## OperatorInstruction

The class used to represent operator instructions.

```js
class OperatorInstruction extends Instruction
```

- More information on instructions is available in [docs/instructiongenerator/INSTRUCTIONS.md](docs/instructiongenerator/INSTRUCTIONS.md) and [README.md](README.md)

### Attributes

* **`this.variable`**: The `Token` in `this.tokenList` representing the symbolic address of the memory location the instruction manipulates.
* **`this.branchFrom`**: The `Token` in `this.tokenList` representing the label associated with this instruction, if one exists; otherwise `null`.

## SystemInstruction

The class used to represent system instructions.

```js
class SystemInstruction extends Instruction
```

- More information on instructions is available in [docs/instructiongenerator/INSTRUCTIONS.md](docs/instructiongenerator/INSTRUCTIONS.md) and [README.md](README.md)

### Attributes

* **`this.branchFrom`**: The `Token` in `this.tokenList` representing the label associated with this instruction, if one exists; otherwise `null`.

## AssignmentInstruction

The class used to represent an assignment instruction.

```js
class AssignmentInstruction extends Instruction
```

- More information on instructions is available in [docs/instructiongenerator/INSTRUCTIONS.md](docs/instructiongenerator/INSTRUCTIONS.md) and [README.md](README.md)

### Attributes

* **`this.variable`**: The `Token` in `this.tokenList` representing the symbolic address of a memory location.
* **`this.value`**: The value that would be stored in that memory location. Defaults to `0`.