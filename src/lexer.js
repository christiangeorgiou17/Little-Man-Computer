

class Token {
    constructor(token_type, value=null) {
        this.token_type = token_type;
        this.value = value;
    }
    toString() {
        if (this.value !== null) {
            return `Token(type=${this.token_type}, value=${this.value})`;
        } else {
            return `Token(type=${this.token_type})`
        }
    }
}


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

const INSTRUCTIONS = OPERATOR_INSTRUCTIONS.concat(SYSTEM_INSTRUCTIONS, BRANCH_INSTRUCTIONS, ["DAT"])



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
        this.value = tokenList[2].value
    }
}






export class Lexer {
    constructor(text) {
        this.text = text;
        this.textList = text.split(/\s+/);
        for (let x = 0; x < this.textList.length; x++) {
            this.textList[x] = this.textList[x].toUpperCase()
        }
        this.position = -1;
        this.current_data = null

        this.advance()
    }

    advance() {
        this.position += 1
        if (this.position < this.textList.length) {
            this.current_data = this.textList[this.position]
        } else {
            this.current_data = null;
        }
    }

    tokenise() {
        let tokenList = []

        while (this.current_data !== null) {
            if (INSTRUCTIONS.includes(this.current_data)) {
                tokenList.push(new Token("INST", this.current_data))
                this.advance()
            } else if (!isNaN(this.current_data)) {
                tokenList.push(new Token("NUM", Number(this.current_data)))
                this.advance()
            } else {
                tokenList.push(new Token("VAR", this.current_data))
                this.advance()
            }
        }

        return tokenList
    }

}



export class InstructionGenerator {
    constructor(tokenList) {
        this.tokens = tokenList;
        this.position = -1;
        this.current_data = null;
        this.advance()
    }
    advance() {
        this.position += 1
        if (this.position < this.tokens.length) {
            this.current_data = this.tokens[this.position]
        } else {
            this.current_data = null;
        }
    }
    check_index(index) {
        if (index < 0 || index >= this.tokens.length) {
            return false;
        } else {
            return true;
        }
    }

    static choseInstructionType(tokenList, instruction, memorylocation) {
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
        
        let current_instruction = []
        while (this.current_data !== null) {
            if (this.current_data.token_type === "VAR" || 
                    (this.current_data.token_type === "NUM" && current_instruction.length > 0)) {
                current_instruction.push(this.current_data)
                this.advance();
            } else if ((this.current_data.value === "INP" || 
                    this.current_data.value === "OUT" || 
                    this.current_data.value === "HLT") &&
                    current_instruction.length <= 1) {
                current_instruction.push(this.current_data);
                instructionList.push(InstructionGenerator.choseInstructionType(current_instruction, this.current_data.value, instructionList.length));
                current_instruction = []
                this.advance();
            } else if ((this.current_data.token_type === "INST" && this.check_index(this.position + 1)) &&
                    current_instruction.length <= 1) {
                current_instruction.push(this.current_data);
                let inst = this.current_data.value
                this.advance();
                current_instruction.push(this.current_data);
                instructionList.push(InstructionGenerator.choseInstructionType(current_instruction, inst, instructionList.length));
                current_instruction = []
                this.advance();
            } else {
                instructionList.push("Error")
                current_instruction = []
                this.advance();
            }
        }

        return instructionList
    }
}
