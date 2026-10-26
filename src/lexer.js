

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