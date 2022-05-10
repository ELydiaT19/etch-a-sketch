// DECLARE VARS
let gridSize = 16;
let singleColorValue = "#000000";
let mode = null;

// SELECT ELEMENTS
const grid = document.getElementById("grid");
const gridSizeInput = document.getElementById("grid-size-input");
const colorInput = document.getElementById("color-input");

const singlecolorBtn = document.getElementById("singlecolor-btn");
const rainbowBtn = document.getElementById("rainbow-btn");
const eraserBtn = document.getElementById("eraser-btn");
const clearBtn = document.getElementById("clear-btn");

// DEFINE FNS
// Enable btns
function enableAllBtns() {
    const allBtns = document.querySelectorAll(".btn--mode");
    allBtns.forEach((allBtn) => {
        allBtn.disabled = false;
    });
}

// Grid
function resetGrid () {
    gridSize = null;
    const localRows = document.querySelectorAll(".row");
    localRows.forEach((localRows) => {
        localRows.remove();
    });
    const localCells = document.querySelectorAll(".cell");
    localCells.forEach((localCell) => {
        localCell.remove();
    });
}

function clearGrid() {
    const localCells = document.querySelectorAll(".cell");
    localCells.forEach((localCell) => {
        localCell.style.backgroundColor = "transparent";
    });
    enableAllBtns();
}

function makeGrid() { 
    for (let i = 0; i < gridSize; i++) {
        const row = document.createElement("div");
        grid.append(row);
        row.classList.add("row");

        for (let j = 0; j < gridSize; j++) {
            const cell =  document.createElement("div");
            row.append(cell);
            cell.classList.add("cell");
            cell.addEventListener("mouseenter", onCellHover);
        }
    }
}

function updateGridSizeLabel() {
    const gridSizeLabel = document.getElementById("grid-size-label");
    gridSizeLabel.innerText = `${gridSize} x ${gridSize}`;
}

function onGridSizeChange(e) {
    resetGrid();
    gridSize = e.target.value;
    makeGrid();
    updateGridSizeLabel();
}

// Single color mode
function onColorPickerChange(e) { 
    singleColorValue = e.target.value; 
}
function enableSingleMode() {
    enableAllBtns();
    singlecolorBtn.disabled = true;
    mode = "single"
}

// Rainbow mode
function enableRainbowMode() {
    enableAllBtns();
    rainbowBtn.disabled = true;
    mode = "rainbow"
}

// Eraser mode
function enableEraser() { 
    enableAllBtns();
    eraserBtn.disabled = true;
    mode = "eraser";
}

// Update cell bg color
function onCellHover(e) {
    const cell = e.target;

    if (mode === "single") {    
        cell.style.backgroundColor = singleColorValue;
    }
    else if (mode === "rainbow") {
        cell.style.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    }
    else if (mode === "eraser") {
        cell.style.backgroundColor = "transparent";
    }
}

// EVENT LISTENERS
colorInput.addEventListener("input", onColorPickerChange);
gridSizeInput.addEventListener("change", onGridSizeChange);

singlecolorBtn.addEventListener("click", enableSingleMode);
rainbowBtn.addEventListener("click", enableRainbowMode);
eraserBtn.addEventListener("click", enableEraser);
clearBtn.addEventListener("click", clearGrid);

// FN CALLS
enableAllBtns();
makeGrid();
updateGridSizeLabel();
enableSingleMode();