<h2>Image Carousel</h2>
<div id="carousel" class="carousel">
    <img src="/api/placeholder/400/300" alt="Placeholder 1" class="carousel-image">
    <img src="/api/placeholder/400/300" alt="Placeholder 2" class="carousel-image">
    <img src="/api/placeholder/400/300" alt="Placeholder 3" class="carousel-image">
    <button class="prev">Previous</button>
    <button class="next">Next</button>
</div>
<script>
    const carousel = document.getElementById('carousel');
    const images = carousel.querySelectorAll('.carousel-image');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    let currentIndex = 0;

    function showImage(index) {
        images.forEach((img, i) => {
            img.style.display = i === index ? 'block' : 'none';
        });
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });

    showImage(currentIndex);
</script>