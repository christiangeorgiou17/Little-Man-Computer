# Little Man Computer

This is a Little Man Computer assembly emulator created using HTML, CSS, and JavaScript. To view the site, visit: [https://littlemancomputer.christiangeorgiou.com](https://littlemancomputer.christiangeorgiou.com)

## What is Assembly?

Assembly is a low-level programming language that translates directly into binary machine code, allowing a user to communicate with a computer's hardware. Assembly code is not portable and will not work on devices with different architectures.

## LMC Commands

* **ADD (1xx)**: Adds the value at the specified address to the value in the accumulator and stores the result back in the accumulator.
* **SUB (2xx)**: Subtracts the value at the specified address from the value in the accumulator and stores the result back in the accumulator.
* **STA (3xx)**: Stores the value in the accumulator at the specified address.
* **LDA (5xx)**: Loads the value from the specified address into the accumulator.
* **BRA (6xx)**: Sets the program counter to the specified address so the program can branch or jump to that location in the code.
* **BRZ (7xx)**: Sets the program counter to the specified address so the program can branch or jump to that location in the code if the value in the accumulator is zero.
* **BRP (8xx)**: Sets the program counter to the specified address so the program can branch or jump to that location in the code if the value in the accumulator is zero or positive.
* **INP (901)**: Takes user input and stores it in the accumulator.
* **OUT (902)**: Outputs the value in the accumulator to the user.
* **HLT (000)**: Ends the program.

## Project Structure

* **`Lexer`**: Takes a `String` of instructions and returns a list of `Token`s. - [File](src/lexer.js)
* **`InstructionGenerator`**: Takes the `Token` list and combines related ones into `Instruction` objects based on the underlying instruction. The `Instruction` objects are: `BranchInstruction`, `OperatorInstruction`, `SystemInstruction`, and `AssignmentInstruction`. - [File](src/instructiongenerator.js)
* **`Assembler`**: Takes the list of `Instruction` objects and translates them into the denary values of their machine code translation, placing them into their corresponding positions in `MEMORY`. - [File](src/assembler.js)
* **`Processor`**: Takes the `Memory` and executes each instruction one by one based on the value of `Processor.programCounter`. - [File](src/main.js)