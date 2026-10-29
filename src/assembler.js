import { BranchInstruction, OperatorInstruction, SystemInstruction, AssignmentInstruction } from "./lexer.js"


const INSTRUCTION_TABLE = {
    "HLT": "000",
    "ADD": "1",
    "SUB": "2",
    "STA": "3",
    "LDA": "5",
    // Theres no 4?
    "BRA": "6",
    "BRZ": "7",
    "BRP": "8",
    "INP": "901",
    "OUT": "902"
}


export const MEMORY = [
    "000", "000", "000", "000", "000", "000", "000", "000", "000", "000",
    "000", "000", "000", "000", "000", "000", "000", "000", "000", "000",
    "000", "000", "000", "000", "000", "000", "000", "000", "000", "000",
    "000", "000", "000", "000", "000", "000", "000", "000", "000", "000",
    "000", "000", "000", "000", "000", "000", "000", "000", "000", "000",
    "000", "000", "000", "000", "000", "000", "000", "000", "000", "000",
    "000", "000", "000", "000", "000", "000", "000", "000", "000", "000",
    "000", "000", "000", "000", "000", "000", "000", "000", "000", "000",
    "000", "000", "000", "000", "000", "000", "000", "000", "000", "000",
    "000", "000", "000", "000", "000", "000", "000", "000", "000", "000"
]



/*
Assembler is probably not the best name for this section as its the name of the whole proccess
but I couldnt think of a better name - this section converts the list of Instruction generated
in lexer.js by Lexer and InstructionGenerator into machine code in denary - e.g. INP becomes 901
*/
class Assmebler {
    constructor(instructions) {
        this.instructions = instructions;
        this.position = -1
        this.check_position = -1
        this.current_instruction = null
        this.advance()
    }

    advance() {
        this.position += 1
        if (this.position < this.instructions.length) {
            this.current_instruction = this.instructions[this.position]
        } else {
            this.current_instruction = null;
        }
    }

    static format(value, places = 3) { // Integers only - for now
        value = String(value)

        /* places is here to allow it to be to 2 or 3, 2 might be needed for branching, e.g.
        when the memory location could be 1 and it needs to do "6" + "01" */
        while (value.length < places) {
            value = "0" + value
        }

        return value
    }

    findMemoryLocation(symbolicAddress, mode) {
        // Mode can either be: VAR BRANCH
        for (let x = 0; x < this.instructions.length; x++) {
            if (mode === "BRANCH") {
                if (this.instructions[x].branchFrom === symbolicAddress) {
                    return this.instructions[x].memoryLocation;
                }
            } else if (mode === "VAR" && this.instructions[x] instanceof AssignmentInstruction) {
                if (this.instructions[x].variable === symbolicAddress) {
                    return this.instructions[x].memoryLocation;
                }
            }
        }
    }

    convert() {

        while (this.current_instruction !== null) {
            if (this.current_instruction instanceof SystemInstruction) {
                MEMORY[this.current_instruction.memoryLocation] = INSTRUCTION_TABLE[this.current_instruction.instruction]
                this.advance()
            } else if (this.current_instruction instanceof AssignmentInstruction) {
                MEMORY[this.current_instruction.memoryLocation] = Assmebler.format(this.current_instruction.value)
                this.advance()
            } else if (this.current_instruction instanceof BranchInstruction) {
                let branchLocation = this.findMemoryLocation(this.current_instruction.branchTo, "BRANCH")
                let formatted = INSTRUCTION_TABLE[this.current_instruction.instruction] + Assmebler.format(branchLocation, 2)
                MEMORY[this.current_instruction.memoryLocation] = formatted
                this.advance()
            } else if (this.current_instruction instanceof OperatorInstruction) {
                let varLocation = this.findMemoryLocation(this.current_instruction.variable, "VAR")
                let formatted = INSTRUCTION_TABLE[this.current_instruction.instruction] + Assmebler.format(varLocation, 2)
                MEMORY[this.current_instruction.memoryLocation] = formatted
                this.advance()
            }
        }
    }
}

