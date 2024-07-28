document.getElementById('imageInput').addEventListener('change', loadImage);
document.getElementById('processButton').addEventListener('click', processImage);
document.getElementById('downloadJPEG').addEventListener('click', downloadJPEG);
document.getElementById('downloadRaw').addEventListener('click', downloadRaw);

let canvas = document.getElementById('imageCanvas');
let ctx = canvas.getContext('2d');
let image = new Image();

function loadImage(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = function(e) {
        image.onload = function() {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        }
        image.src = e.target.result;
    }
    reader.readAsDataURL(file);
}

function processImage() {
    // Implement edge detection and shape outlining here
}

function downloadJPEG() {
    let link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpeg');
    link.download = 'processed-image.jpeg';
    link.click();
}

function downloadRaw() {
    let link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'processed-image.png';
    link.click();
}

function processImage() {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    // Apply Sobel operator
    let grayscale = toGrayscale(data);
    let sobelData = sobelFilter(grayscale, canvas.width, canvas.height);

    // Draw outlines on canvas
    drawOutlines(sobelData);

    // Calculate average pixel value within shapes
    calculateAveragePixelValue(sobelData);
}

function toGrayscale(data) {
    let grayscale = new Uint8ClampedArray(data.length / 4);
    for (let i = 0; i < data.length; i += 4) {
        let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        grayscale[i / 4] = avg;
    }
    return grayscale;
}

function sobelFilter(data, width, height) {
    let kernelX = [
        -1, 0, 1,
        -2, 0, 2,
        -1, 0, 1
    ];
    let kernelY = [
        -1, -2, -1,
         0,  0,  0,
         1,  2,  1
    ];

    let sobelData = new Uint8ClampedArray(data.length);
    let grayscale = data;

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            let pixelX = (
                (kernelX[0] * grayscale[((y - 1) * width + (x - 1))]) +
                (kernelX[1] * grayscale[((y - 1) * width + x)]) +
                (kernelX[2] * grayscale[((y - 1) * width + (x + 1))]) +
                (kernelX[3] * grayscale[(y * width + (x - 1))]) +
                (kernelX[4] * grayscale[(y * width + x)]) +
                (kernelX[5] * grayscale[(y * width + (x + 1))]) +
                (kernelX[6] * grayscale[((y + 1) * width + (x - 1))]) +
                (kernelX[7] * grayscale[((y + 1) * width + x)]) +
                (kernelX[8] * grayscale[((y + 1) * width + (x + 1))])
            );

            let pixelY = (
                (kernelY[0] * grayscale[((y - 1) * width + (x - 1))]) +
                (kernelY[1] * grayscale[((y - 1) * width + x)]) +
                (kernelY[2] * grayscale[((y - 1) * width + (x + 1))]) +
                (kernelY[3] * grayscale[(y * width + (x - 1))]) +
                (kernelY[4] * grayscale[(y * width + x)]) +
                (kernelY[5] * grayscale[(y * width + (x + 1))]) +
                (kernelY[6] * grayscale[((y + 1) * width + (x - 1))]) +
                (kernelY[7] * grayscale[((y + 1) * width + x)]) +
                (kernelY[8] * grayscale[((y + 1) * width + (x + 1))])
            );

            let magnitude = Math.sqrt((pixelX * pixelX) + (pixelY * pixelY)) >>> 0;

            sobelData[y * width + x] = magnitude;
        }
    }

    return sobelData;
}

function drawOutlines(data) {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let output = imageData.data;

    for (let i = 0; i < data.length; i++) {
        let value = data[i];
        output[i * 4] = value;
        output[i * 4 + 1] = value;
        output[i * 4 + 2] = value;
        output[i * 4 + 3] = 255;
    }

    ctx.putImageData(imageData, 0, 0);
}

function calculateAveragePixelValue(data) {
    let width = canvas.width;
    let height = canvas.height;
    let visited = new Uint8Array(data.length);
    let shapes = [];
    
    function floodFill(x, y, shape) {
        let stack = [[x, y]];
        let index = (y * width + x);

        while (stack.length > 0) {
            let [cx, cy] = stack.pop();
            let idx = (cy * width + cx);

            if (visited[idx] || data[idx] === 0) continue;

            visited[idx] = 1;
            shape.push([cx, cy]);

            if (cx > 0) stack.push([cx - 1, cy]);
            if (cy > 0) stack.push([cx, cy - 1]);
            if (cx < width - 1) stack.push([cx + 1, cy]);
            if (cy < height - 1) stack.push([cx, cy + 1]);
        }
    }

    // Detect shapes using flood fill
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let index = (y * width + x);
            if (data[index] > 0 && !visited[index]) {
                let shape = [];
                floodFill(x, y, shape);
                shapes.push(shape);
            }
        }
    }

    // Calculate average pixel value for each shape
    shapes.forEach((shape, shapeIndex) => {
        let totalR = 0, totalG = 0, totalB = 0;

        shape.forEach(([x, y]) => {
            let idx = (y * width + x) * 4;
            totalR += image.data[idx];
            totalG += image.data[idx + 1];
            totalB += image.data[idx + 2];
        });

        let avgR = totalR / shape.length;
        let avgG = totalG / shape.length;
        let avgB = totalB / shape.length;

        console.log(`Shape ${shapeIndex + 1}: Average RGB = (${avgR}, ${avgG}, ${avgB})`);
    });
}

