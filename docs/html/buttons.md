# HTML Buttons

Several buttons allow the user to interact with the LMC translator and processor.

## **`submitButton`**

This button takes the entered assembly code, translates it, and assembles it into memory.

```html
<button type="button" id="submit-button">Submit</button>
```

```js
const submitButton = document.getElementById("submit-button")
```

### eventListener

* The assembly code is retrieved from the input element and stored in `inputInstructionText`. It is then passed to `translate`.

```js
const inputElement = document.getElementById("assembly-code-input")
const inputInstructionText = inputElement.value
translate(inputInstructionText)
```

* The output and registers are reset, and the translated code is rendered in the HTML memory display.

```js
resetOutput()
resetRegisters()
assembleIntoRAM()
```

## **`runButton`**

This button executes the translated code stored in `MEMORY`.

```html
<button type="button" id="run-button">Run</button>
```

```js
const runButton = document.getElementById("run-button")
```

### eventListener

When the button is clicked, the `execute` function is run.

```js
runButton.addEventListener("click", execute)
```

## **`assembleButton`**

This button updates the HTML memory display with the current instructions and data in `MEMORY`.

```html
<button type="button" id="assemble-into-ram-button">Assemble Into RAM</button>
```

```js
const assembleButton = document.getElementById("assemble-into-ram-button")
```

### eventListener

When the button is clicked, the `assembleIntoRAM` function is run.

```js
assembleButton.addEventListener("click", assembleIntoRAM)
```