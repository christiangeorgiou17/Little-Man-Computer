


const OPERATOR_INSTRUCTIONS = [
    "STA",
    "LDA",
    "ADD",
    "SUB"
]
const SYSTEM_INSTRUCTIONS = [
    "INP",
    "OUT",
    "HLT"
]
const BRANCH_INSTRUCTIONS = [
    "BRA",
    "BRP",
    "BRZ"
]

export const INSTRUCTIONS = OPERATOR_INSTRUCTIONS.concat(SYSTEM_INSTRUCTIONS, BRANCH_INSTRUCTIONS, ["DAT"])



export class Instruction {
    constructor(tokenList, instruction, memoryLocation) {
        this.tokens = tokenList
        this.instruction = instruction
        this.memoryLocation = memoryLocation
    }

    toString() {
        let instructions = String(this.tokens)
        return `Instruction(${instructions})`
    }
}

export class BranchInstruction extends Instruction {
    // BRA BRP BRZ
    constructor(tokenList, instruction, memoryLocation) {
        super(tokenList, instruction, memoryLocation)
        if (tokenList.length === 2) {
            this.branchTo = tokenList[1].value
            this.branchFrom = null
        } else if (tokenList.length === 3) {
            this.branchTo = tokenList[2].value
            this.branchFrom = tokenList[0].value
        }
    }
}

export class OperatorInstruction extends Instruction {
    // ADD SUB LDA STA
    constructor(tokenList, instruction, memoryLocation) {
        super(tokenList, instruction, memoryLocation)
        if (tokenList.length === 2) {
            this.variable = tokenList[1].value
            this.branchFrom = null
        } else if (tokenList.length === 3) {
            this.variable = tokenList[2].value
            this.branchFrom = tokenList[0].value
        }
    }
}

export class SystemInstruction extends Instruction {
    // INP OUT HLT
    constructor(tokenList, instruction, memoryLocation) {
        super(tokenList, instruction, memoryLocation)
        if (tokenList.length === 2) {
            this.branchFrom = tokenList[0].value
        } else {
            this.branchFrom = null
        }
    }
}

export class AssignmentInstruction extends Instruction {
    // DAT
    constructor(tokenList, memoryLocation) {
        super(tokenList, "DAT", memoryLocation)
        this.variable = tokenList[0].value
        if (tokenList.length === 3) {
            this.value = tokenList[2].value
        } else {
            this.value = 0
        }
    }
}




export class InstructionGenerator {
    constructor(tokenList) {
        this.tokens = tokenList;
        this.position = -1;
        this.currentData = null;
        this.advance()
    }
    advance() {
        this.position += 1
        if (this.position < this.tokens.length) {
            this.currentData = this.tokens[this.position]
        } else {
            this.currentData = null;
        }
    }
    checkIndex(index) {
        if (index < 0 || index >= this.tokens.length) {
            return false;
        } else {
            return true;
        }
    }

    static chooseInstructionType(tokenList, instruction, memorylocation) {
        if (OPERATOR_INSTRUCTIONS.includes(instruction)) {
            return new OperatorInstruction(tokenList, instruction, memorylocation)
        } else if (SYSTEM_INSTRUCTIONS.includes(instruction)) {
            return new SystemInstruction(tokenList, instruction, memorylocation)
        } else if (BRANCH_INSTRUCTIONS.includes(instruction)) {
            return new BranchInstruction(tokenList, instruction, memorylocation)
        } else if (instruction === "DAT") {
            return new AssignmentInstruction(tokenList, memorylocation)
        } else {
            return new Instruction(tokenList, instruction, memorylocation)
        }
    }

    generate() {
        let instructionList = []
        
        let currentInstruction = []
        while (this.currentData !== null) {
            if (this.currentData === "Error") {
                instructionList.push("Error")
                break;
            } else if (this.currentData.tokenType === "VAR" || 
                    (this.currentData.tokenType === "NUM" && currentInstruction.length > 0)) {
                currentInstruction.push(this.currentData)
            } else if (((this.currentData.value === "INP" || 
                    this.currentData.value === "OUT" || this.currentData.value === "HLT") &&
                    currentInstruction.length <= 1)) {
                currentInstruction.push(this.currentData);
                instructionList.push(InstructionGenerator.chooseInstructionType(currentInstruction, this.currentData.value, instructionList.length));
                currentInstruction = []
            } else if (this.currentData.value === "DAT" && currentInstruction.length === 1) {
                if (this.checkIndex(this.position + 1)) {
                    if (this.tokens[this.position + 1].tokenType !== "NUM") {
                        currentInstruction.push(this.currentData);
                        instructionList.push(InstructionGenerator.chooseInstructionType(currentInstruction, this.currentData.value, instructionList.length));
                        currentInstruction = []
                    } else {
                        currentInstruction.push(this.currentData);
                        let inst = this.currentData.value
                        this.advance();
                        currentInstruction.push(this.currentData);
                        instructionList.push(InstructionGenerator.chooseInstructionType(currentInstruction, inst, instructionList.length));
                        currentInstruction = []
                    }
                } else {
                    currentInstruction.push(this.currentData);
                    instructionList.push(InstructionGenerator.chooseInstructionType(currentInstruction, this.currentData.value, instructionList.length));
                    currentInstruction = []
                }
            } else if ((this.currentData.tokenType === "INST" && this.checkIndex(this.position + 1)) &&
                    currentInstruction.length <= 1) {
                currentInstruction.push(this.currentData);
                let inst = this.currentData.value
                this.advance();
                currentInstruction.push(this.currentData);
                instructionList.push(InstructionGenerator.chooseInstructionType(currentInstruction, inst, instructionList.length));
                currentInstruction = []
            } else {
                instructionList.push("Error")
                currentInstruction = []
            }
            this.advance();
        }

        return instructionList
    }
}
