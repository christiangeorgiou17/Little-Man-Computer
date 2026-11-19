import { INSTRUCTIONS } from "./instructiongenerator.js";


class Token {
    constructor(tokenType, value=null) {
        this.tokenType = tokenType;
        this.value = value;
    }
    toString() {
        if (this.value !== null) {
            return `Token(type=${this.tokenType}, value=${this.value})`;
        } else {
            return `Token(type=${this.tokenType})`
        }
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
        this.currentData = null

        this.advance()
    }

    advance() {
        this.position += 1
        if (this.position < this.textList.length) {
            this.currentData = this.textList[this.position]
        } else {
            this.currentData = null;
        }
    }

    tokenise() {
        let tokenList = []

        while (this.currentData !== null) {
            if (INSTRUCTIONS.includes(this.currentData)) {
                tokenList.push(new Token("INST", this.currentData))
                this.advance()
            } else if (!isNaN(this.currentData)) {
                tokenList.push(new Token("NUM", Number(this.currentData)))
                this.advance()
            } else {
                tokenList.push(new Token("VAR", this.currentData))
                this.advance()
            }
        }

        return tokenList
    }

}

