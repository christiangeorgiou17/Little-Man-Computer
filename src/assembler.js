import { Instruction, BranchInstruction, OperatorInstruction, SystemInstruction, AssignmentInstruction } from "./lexer.js"


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


// export const MEMORY = {
//     0: "000", 1: "000", 2: "000", 3: "000", 4: "000", 5: "000", 6: "000", 7: "000", 8: "000", 9: "000",
//     10: "000", 11: "000", 12: "000", 13: "000", 14: "000", 15: "000", 16: "000", 17: "000", 18: "000", 19: "000",
//     20: "000", 21: "000", 22: "000", 23: "000", 24: "000", 25: "000", 26: "000", 27: "000", 28: "000", 29: "000",
//     30: "000", 31: "000", 32: "000", 33: "000", 34: "000", 35: "000", 36: "000", 37: "000", 38: "000", 39: "000",
//     40: "000", 41: "000", 42: "000", 43: "000", 44: "000", 45: "000", 46: "000", 47: "000", 48: "000", 49: "000",
//     50: "000", 51: "000", 52: "000", 53: "000", 54: "000", 55: "000", 56: "000", 57: "000", 58: "000", 59: "000",
//     60: "000", 61: "000", 62: "000", 63: "000", 64: "000", 65: "000", 66: "000", 67: "000", 68: "000", 69: "000",
//     70: "000", 71: "000", 72: "000", 73: "000", 74: "000", 75: "000", 76: "000", 77: "000", 78: "000", 79: "000",
//     80: "000", 81: "000", 82: "000", 83: "000", 84: "000", 85: "000", 86: "000", 87: "000", 88: "000", 89: "000",
//     90: "000", 91: "000", 92: "000", 93: "000", 94: "000", 95: "000", 96: "000", 97: "000", 98: "000", 99: "000"
// }
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

