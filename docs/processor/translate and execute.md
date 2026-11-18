# Translation and Execution

This step contains two functions that use the constructs documented previously: `translate` and `execute`.

## translate

The `translate` function converts assembly code text into machine-code instructions and assembles them into memory.

#### Parameters

* **`text`**: The input assembly code text as a `String`.

### Procedure

* First, the text is passed into a new instance of [`Lexer`](/docs/lexer/Lexer.md). The resulting list of [`Token`](/docs/lexer/Token.md) objects is stored in `tokens` and passed to the next stage.

```js
const lexer = new Lexer(text)
const tokens = lexer.tokenise()
```

* Next, `tokens` is passed into a new instance of [`InstructionGenerator`](/docs/instructiongenerator/InstructionGenerator.md). The generated list of [`Instruction`](/docs/instructiongenerator/Instruction.md) objects is stored in `instructionsList`.

```js
const instGenerator = new InstructionGenerator(tokens)
const instructionsList = instGenerator.generate()
```

* Before assembly, the values in [`MEMORY`](/docs/assembler/MEMORY.md) are reset to prepare for the translated instructions.

```js
for (let x = 0; x < MEMORY.length; x++) {
    MEMORY[x] = "000"
}
```

* Finally, `instructionsList` is passed into a new instance of [`Assembler`](/docs/assembler/assembler.md). The machine-code instructions are converted to denary values and assembled into [`MEMORY`](/docs/assembler/MEMORY.md).

```js
const assembler = new Assembler(instructionsList)
assembler.convert()
```

## execute

After the instructions have been translated and assembled into `MEMORY`, the `execute` function creates a [`Processor`](/docs/processor/processor.md) instance and runs its execution loop.

```js
async function execute() {
    const CPU = new Processor()
    await CPU.execute()
}
```