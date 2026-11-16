# INSTRUCTIONS

This is a global constant list containing string values for the text representation of each LMC command - this list is a concatenation of three other lists and an extra value. These are used in tokenisation by the [Lexer](/docs/lexer/Lexer.md) and instruction generation by the [InstructionGenerator](/docs/instructiongenerator/InstructionGenerator.md)

## **`OPERATOR_INSTRUCTIONS`**

This list contains the instruction names for those that perform operations in the "ALU" or "RAM".

```js
const OPERATOR_INSTRUCTIONS = [
    "STA",
    "LDA",
    "ADD",
    "SUB"
]
```

* **`"STA"`**: This instruction represents "store".
* **`"LDA"`**: This instruction represents "load".
* **`"ADD"`**: This instruction represents "addition".
* **`"SUB"`**: This instruction represents "subtraction".

- More information on LMC commands in [README](/README.md)


## **`SYSTEM_INSTRUCTIONS`**

This list contains the instruction names for those that perform system instructions - these include user communication and program termination.

```js
const SYSTEM_INSTRUCTIONS = [
    "INP",
    "OUT",
    "HLT"
]
```

* **`"INP"`**: This instruction represents "input".
* **`"OUT"`**: This instruction represents "output".
* **`"HLT"`**: This instruction represents "halt/end".

- More information on LMC commands in [README](/README.md)


## **`BRANCH_INSTRUCTIONS`**

This list contains the instruction names for those that perform branching / jumping instructions that alter the flow of a program.

```js
const BRANCH_INSTRUCTIONS = [
    "BRA",
    "BRP",
    "BRZ"
]
```

* **`"BRA"`**: This instruction represents "branch always".
* **`"BRP"`**: This instruction represents "branch if >= 0".
* **`"BRZ"`**: This instruction represents "branch if == 0".

- More information on LMC commands in [README](/README.md)


### `DAT`

This is the final instruction, and it is used for assigning symbolic addresses and values.