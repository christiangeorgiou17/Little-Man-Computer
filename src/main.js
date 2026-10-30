import { Lexer } from "./lexer.js"
import { Assembler, MEMORY } from "./assembler.js"
import { InstructionGenerator } from "./instructiongenerator.js"



class Processor {
    constructor(memory) {
        this.memory = memory
        // Registers
        this.accumulator = 0
        this.programCounter = 0
        this.instructionRegister = "0"
        this.addressRegister = "00"
        this.executing = true;
    }

    fetchNextInstruction() {
        let instruction = String(this.memory[this.programCounter])
        this.instructionRegister = instruction[0]
        this.addressRegister = instruction.substring(1)
    }

    fetchData(memoryAddress) {
        memoryAddress = Number(memoryAddress)
        let data = this.memory[memoryAddress]
        return data;
    }

    halt() {
        this.executing = false;
    }
    add(address) {
        this.accumulator += Number(this.fetchData(address))
    }
    subtract(address) {
        this.accumulator -= Number(this.fetchData(address))
    }
    store(address) {
        this.memory[address] = Assembler.format(this.accumulator)
    }
    load(address) {
        this.accumulator = Number(this.fetchData(address))
    }
    branchAlways(address) {
        this.programCounter = Number(address)
    }
    branchZero(address) {
        if (this.accumulator === 0) {
            this.programCounter = Number(address)
        }
    }
    branchPositive(address) {
        if (this.accumulator >= 0) {
            this.programCounter = Number(address)
        }
    }
    async input() {
        const inputElement = document.getElementById("standard-input")
        inputElement.disabled = false;
        inputElement.focus()
        /* A Promise is used as inputs are event-driven - so an await call by itself wont be 
        good enough; it requires a Promise to tell when exactly the user enters the input. */
        const inputtedValue = await new Promise((resolve) => {
            const keyHandler = (event) => {
                if (event.key === "Enter") {
                    const value = inputElement.value;

                    inputElement.removeEventListener("keydown", keyHandler);
                    inputElement.disabled = true
                    inputElement.value = ""

                    resolve(value)
                }
            }

            inputElement.addEventListener("keydown", keyHandler)
        })

        this.accumulator = Number(inputtedValue);
    }
    output() {
        const outputElement = document.getElementById("standard-output")
        const outputValue = document.createElement("li")
        outputElement.appendChild(outputValue)
        outputValue.textContent = this.accumulator
    }

    async execute() {
        while (this.executing) {
            this.fetchNextInstruction()
            switch (this.instructionRegister) {
                case "0":
                    this.halt()
                    break;
                case "1":
                    this.add(this.addressRegister)
                    break;
                case "2":
                    this.subtract(this.addressRegister)
                    break;
                case "3":
                    this.store(this.addressRegister)
                    break;
                case "5":
                    this.load(this.addressRegister)
                    break;
                case "6":
                    this.branchAlways(this.addressRegister)
                    break;
                case "7":
                    this.branchZero(this.addressRegister)
                    break;
                case "8":
                    this.branchPositive(this.addressRegister)
                    break;
                case "9":
                    if (this.addressRegister === "01") {
                        await this.input()
                    } else if (this.addressRegister === "02") {
                        this.output()
                    }
                    break;
            }
            this.programCounter += 1
        }
    }
}



function translate(text) {
    const lexer = new Lexer(text)
    const tokens = lexer.tokenise()
    const instGenerator = new InstructionGenerator(tokens)
    const instructionsList = instGenerator.generate()
    const assembler = new Assembler(instructionsList)
    assembler.convert()
}


translate("inp add num out num dat 1")
let test = new Processor(MEMORY)
await test.execute()