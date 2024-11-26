const canvas = document.getElementById('fractalTree');
const ctx = canvas.getContext('2d');

const lengthInput = document.getElementById('lengthInput');
const angleInput = document.getElementById('angleInput');
const depthInput = document.getElementById('depthInput');

let length, angleOffset, depth;

const drawFractalTree = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawTree(canvas.height, 0);
};

// handlers
const updateFractalTree = () => {
    length = lengthInput.value;
    angleOffset = parseFloat(angleInput.value);
    depth = depthInput.value;

    drawFractalTree();
};

lengthInput.addEventListener('input', updateFractalTree);
angleInput.addEventListener('input', updateFractalTree);
depthInput.addEventListener('input', updateFractalTree);

updateFractalTree();
