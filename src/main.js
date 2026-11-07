import { Lexer } from "./lexer.js"
import { Assembler, MEMORY } from "./assembler.js"
import { InstructionGenerator } from "./instructiongenerator.js"


// Wait x seconds
const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

class Processor {
    constructor() {
        // Registers
        this.accumulator = 0
        this.programCounter = 0
        this.instructionRegister = "0"
        this.addressRegister = "00"
        this.executing = true;
    }

    fetchNextInstruction() {
        let instruction = String(MEMORY[this.programCounter])
        this.instructionRegister = instruction[0]
        this.addressRegister = instruction.substring(1)
    }

    fetchData(memoryAddress) {
        memoryAddress = Number(memoryAddress)
        let data = MEMORY[memoryAddress]
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
        MEMORY[Number(address)] = Assembler.format(this.accumulator)
        assembleIntoRAM()
    }
    load(address) {
        this.accumulator = Number(this.fetchData(address))
    }
    // There is an underlying problem with how the program counter increments - this adjusts for it but doesnt fix it. Im too tired right now
    branchAlways(address) {
        this.programCounter = Number(address - 1)
    }
    branchZero(address) {
        if (this.accumulator === 0) {
            this.programCounter = Number(address - 1)
        }
    }
    branchPositive(address) {
        if (this.accumulator >= 0) {
            this.programCounter = Number(address - 1)
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

    showRegisters() {
        const ACC = document.getElementById("accumulator")
        const PC = document.getElementById("program-counter")
        const IR = document.getElementById("instruction-register")
        const AR = document.getElementById("address-register")
        ACC.textContent = this.accumulator;
        PC.textContent = this.programCounter;
        IR.textContent = this.instructionRegister;
        AR.textContent = this.addressRegister;
    }

    async execute() {
        while (this.executing) {
            await wait(500)
            this.fetchNextInstruction()
            this.showRegisters()
            await wait(500)
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
    for (let x = 0; x < MEMORY.length; x++) {
        MEMORY[x] = "000"
    }
    const assembler = new Assembler(instructionsList)
    assembler.convert()
}

async function execute() {
    const CPU = new Processor()
    await CPU.execute()
}


function assembleIntoRAM() {
    const memoryList = document.getElementById("memory")
    while (memoryList.firstChild !== null) {
        memoryList.removeChild(memoryList.firstChild)
    }
    for (let x = 0; x < MEMORY.length; x++) {
        const memoryUL = document.getElementById("memory")
        const memoryLI = document.createElement("li")
        memoryUL.appendChild(memoryLI)
        memoryLI.textContent = MEMORY[x]
    }
}

function resetOutput() {
    const outputElement = document.getElementById("standard-output")
    while (outputElement.firstChild !== null) {
        outputElement.removeChild(outputElement.firstChild)
    }
}

function resetRegisters() {
    const ACC = document.getElementById("accumulator")
    const PC = document.getElementById("program-counter")
    const IR = document.getElementById("instruction-register")
    const AR = document.getElementById("address-register")
    ACC.textContent = "0";
    PC.textContent = "0";
    IR.textContent = "0";
    AR.textContent = "00";
}



const submitButton = document.getElementById("submit-button")
const runButton = document.getElementById("run-button")
const assembleButton = document.getElementById("assemble-into-ram-button")


submitButton.addEventListener("click", () => {
    const inputElement = document.getElementById("assembly-code-input")
    const inputInstructionText = inputElement.value
    translate(inputInstructionText)
    resetOutput()
    resetRegisters()
    assembleIntoRAM()
})

runButton.addEventListener("click", execute)

assembleButton.addEventListener("click", assembleIntoRAM)


document.addEventListener("DOMContentLoaded", () => {
    assembleIntoRAM()
})

