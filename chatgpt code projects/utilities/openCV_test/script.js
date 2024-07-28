document.addEventListener('DOMContentLoaded', () => {
    if (typeof cv === 'undefined') {
        document.body.innerHTML += '<p>Error: OpenCV.js is not loaded.</p>';
        return;
    }

    cv.onRuntimeInitialized = () => {
        console.log('OpenCV.js is ready.');

        const fileInput = document.getElementById('fileInput');
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (!file) {
                document.body.innerHTML += '<p>Error: No file selected.</p>';
                return;
            }

            const reader = new FileReader();
            
            reader.onload = (e) => {
                const imgElement = new Image();
                imgElement.onload = () => {
                    canvas.width = imgElement.width;
                    canvas.height = imgElement.height;
                    ctx.drawImage(imgElement, 0, 0);

                    const src = cv.imread(canvas);
                    const dst = new cv.Mat();
                    cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY);
                    cv.threshold(src, dst, 100, 200, cv.THRESH_BINARY);
                    cv.imshow(canvas, dst);

                    src.delete();
                    dst.delete();
                };
                imgElement.src = e.target.result;
            };

            reader.readAsDataURL(file);
        });
    };
});
