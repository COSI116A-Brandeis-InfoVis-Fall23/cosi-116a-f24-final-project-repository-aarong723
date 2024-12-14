document.addEventListener('DOMContentLoaded', function() {
    // Function to initialize the carousel
    function initializeCarousel(carouselId) {
        const carousel = document.querySelector(`#${carouselId} .carousel-inner`);
        const items = document.querySelectorAll(`#${carouselId} .carousel-item`);
        const prevButton = document.querySelector(`#${carouselId} .carousel-control-prev`);
        const nextButton = document.querySelector(`#${carouselId} .carousel-control-next`);
        const dots = document.querySelectorAll(`#${carouselId} .dot`);
        let currentIndex = 0;

        // Function to update the carousel display
        function updateCarousel() {
            const offset = -currentIndex * 100;
            carousel.style.transform = `translateX(${offset}%)`;
            items.forEach((item, index) => {
                item.classList.toggle('active', index === currentIndex);
            });
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        // Event listener for the previous button
        prevButton.addEventListener('click', function(event) {
            event.preventDefault();
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
            updateCarousel();
        });

        // Event listener for the next button
        nextButton.addEventListener('click', function(event) {
            event.preventDefault();
            currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        });

        // Event listeners for the dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentIndex = index;
                updateCarousel();
            });
        });

        // Initial update of the carousel
        updateCarousel(); 
    }

    // Initialize carousels with specific IDs
    initializeCarousel('carouselFigma');
    initializeCarousel('carouselSketch');
});
  
// Function to open the carousel image in fullscreen
function openFullscreen(carouselId) {
    const carousel = document.querySelector(`#${carouselId} .carousel-item.active img`);
    const fullscreenPanel = document.getElementById('fullscreenPanel');
    const fullscreenImage = document.getElementById('fullscreenImage');

    fullscreenImage.src = carousel.src;
    fullscreenPanel.style.display = 'flex';
    document.body.classList.add('no-scroll'); 

    const isSmallScreen = window.matchMedia("(max-width: 1350px)").matches;

    if (carousel.src.includes('figma')) {
        fullscreenImage.style.width = isSmallScreen ? '90%' : '60%';
    } else if (carousel.src.includes('sketch')) {
        fullscreenImage.style.width = isSmallScreen ? '70%' : '35%';
    } 
}

// Function to close the fullscreen image view
function closeFullscreen() {
    const fullscreenPanel = document.getElementById('fullscreenPanel');
    fullscreenPanel.style.display = 'none';
    document.body.classList.remove('no-scroll'); 
}
