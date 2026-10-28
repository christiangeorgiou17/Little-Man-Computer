

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


const INSTRUCTIONS = [
    "STA",
    "LDA",
    "ADD",
    "SUB",
    "INP",
    "OUT",
    "HLT",
    "BRA",
    "BRP",
    "BRZ"
]



class Lexer {
    constructor(text) {
        this.text = text;
        this.textList = text.split(/\s+/);
        for (let x = 0; x < this.textList.length; x++) {
            this.textList[x] = this.textList[x].toUpperCase()
        }
        this.position = -1;
        this.check_position = -1
        this.current_data = null

        this.advance()
    }

    advance() {
        this.position += 1
        if (this.check_position + 1 === this.position) {
            this.check_position += 1
        }
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
            } else if (
                (tokenList[-1].token_type === "INST" && tokenList[-1].value !== "DAT") 
                ) {
                tokenList.push(new Token("VAR", this.current_data))
                this.advance()
            }
        }

        return tokenList
    }

}


