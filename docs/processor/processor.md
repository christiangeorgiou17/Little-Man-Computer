# Processor

`Processor` is a class that executes the machine-code instructions stored in the `MEMORY` array on the LMC "CPU". See [MEMORY Information](/docs/assembler/MEMORY.md).

## Methods

### **constructor**

The initialisation of the `Processor` class.

#### Attributes

* **`this.accumulator`**: Stores values used for arithmetic operations and input. It also stores the result of arithmetic operations.
* **`this.programCounter`**: The address of the next instruction in `MEMORY` to be executed.
* **`this.instructionRegister`**: A one-digit `String` representing the type of instruction being executed.
* **`this.addressRegister`**: A two-digit `String` representing the address that the instruction will manipulate, except for system instructions.
* **`this.executing`**: A `boolean` value determining whether the `Processor` is currently executing machine code.

```js
this.accumulator = 0;
this.programCounter = 0;
this.instructionRegister = "0";
this.addressRegister = "00";
this.executing = true;
```


### **fetchNextInstruction**

This function retrieves the value at the index specified by `this.programCounter` in `MEMORY`. It then splits the value into an instruction and an address. It assigns `this.instructionRegister` the instruction value and `this.addressRegister` the address value.

### **fetchData**

This function returns the data at a specific memory address.

#### Parameters

* **`memoryAddress`**: The location in memory containing the required data.

#### Outputs

The data at the given index in `MEMORY`.

```js
return MEMORY[memoryAddress];
```

### **halt**

Sets `this.executing` to `false`, stopping the `Processor` from continuing to execute instructions in `MEMORY`.

### **add**

Fetches the value at `address`, converts it to a `Number`, and adds it to `this.accumulator`. The result is stored in `this.accumulator`.

### **subtract**

Fetches the value at `address`, converts it to a `Number`, and subtracts it from `this.accumulator`. The result is stored in `this.accumulator`.

### **store**

Stores the current value of `this.accumulator` in `MEMORY` at the specified address.

### **load**

Fetches the value at `address` and stores it in `this.accumulator`.

### **branchAlways**

Sets `this.programCounter` to the given address so the instruction at that address is executed next.

### **branchZero**

Sets `this.programCounter` to the given address, if the value in `this.accumulator` is 0, so the instruction at that address is executed next.

### **branchPositive**

Sets `this.programCounter` to the given address, if the value in `this.accumulator` is greater than or equal to 0, so the instruction at that address is executed next.

### **input**

This asynchronous function uses a `Promise` to wait for user input. The input is retrieved from the element with the ID `"standard-input"`.

```js
const inputElement = document.getElementById("standard-input")
```

### **output**

Outputs the value in `this.accumulator` to the user by creating a new `<li>` element in the unordered list with the ID `"standard-output"`.

### **showRegisters**

Displays the contents of the registers (PC, ACC, IR, & AR)to the user as the LMC code executes.

```js
const ACC = document.getElementById("accumulator")
const PC = document.getElementById("program-counter")
const IR = document.getElementById("instruction-register")
const AR = document.getElementById("address-register")
ACC.textContent = this.accumulator;
PC.textContent = this.programCounter;
IR.textContent = this.instructionRegister;
AR.textContent = this.addressRegister;
```

### **execute**

Executes each instruction within a `while` loop by first calling `this.fetchNextInstruction()`:

```js
while (this.executing)
```

A switch statement checks `this.instructionRegister` to determine which instruction and method to execute:

```js
switch (this.instructionRegister)
```

Finally, the program counter is incremented by one:

```js
this.programCounter += 1
```

This function is asynchronous because it includes other asynchronous operations:

* `wait`: Delays execution so the user can observe each register update.
* `this.input`: Waits for the user to enter data when required.