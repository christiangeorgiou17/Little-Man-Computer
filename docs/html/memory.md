# HTML Memory

A few DOM-manipulation functions relate to updating and visualising the memory and CPU registers for the user.

## **`assembleIntoRAM`**

This function updates the HTML elements that represent memory in two parts:

```html
<ul id="memory"></ul>
```

* All existing `<li>` elements are removed from the `<ul>` with the ID `memory`.

```js
while (memoryList.firstChild !== null) {
    memoryList.removeChild(memoryList.firstChild)
}
```

* One hundred `<li>` elements are added, and each element is assigned the corresponding value in the `MEMORY` array.

```js
for (let x = 0; x < MEMORY.length; x++) {
    const memoryUL = document.getElementById("memory")
    const memoryLI = document.createElement("li")
    memoryUL.appendChild(memoryLI)
    memoryLI.textContent = MEMORY[x]
}
```


## **`resetOutput`**

This function clears the output by removing all `<li>` elements from the `<ul>` with the ID `standard-output`.

```html
<ul id="standard-output"></ul>
```

* All existing `<li>` elements are removed from the `<ul>`.

```js
function resetOutput() {
    const outputElement = document.getElementById("standard-output")
    while (outputElement.firstChild !== null) {
        outputElement.removeChild(outputElement.firstChild)
    }
}
```


## **`resetRegisters`**

This function resets the register values to their initial values when a new program is run.

```html
<ul id="registers">
    <li id="accumulator">0</li>
    <li id="program-counter">0</li>
    <li id="instruction-register">0</li>
    <li id="address-register">00</li>
</ul>
```

* The `textContent` of each register element is reset to `"0"`, except for the address register, which is reset to `"00"`.

```js
ACC.textContent = "0";
PC.textContent = "0";
IR.textContent = "0";
AR.textContent = "00";
```