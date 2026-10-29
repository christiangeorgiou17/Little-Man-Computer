import { Lexer } from "./lexer.js"
import { Assembler, MEMORY } from "./assembler.js"
import { InstructionGenerator } from "./instructiongenerator.js"



function translate(text) {
    const lexer = new Lexer(text)
    const tokens = lexer.tokenise()
    const instGenerator = new InstructionGenerator(tokens)
    const instructionsList = instGenerator.generate()
    const assembler = new Assembler(instructionsList)
    assembler.convert()
}
