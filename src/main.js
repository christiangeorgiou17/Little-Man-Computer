import { Lexer, InstructionGenerator } from "./lexer.js"
import { Assembler, MEMORY } from "./assembler.js"



function translate(text) {
    const lexer = new Lexer(text)
    const tokens = lexer.tokenise()
    const instGenerator = new InstructionGenerator(tokens)
    const instructionsList = instGenerator.generate()
    const assembler = new Assembler(instructionsList)
    assembler.convert()

}

