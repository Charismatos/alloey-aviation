document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextButton = document.querySelector('.next-button');
    const prevButton = document.querySelector('.prev-button');
    const paginationContainer = document.querySelector('.carousel-pagination');

    let currentSlideIndex = 0;
    const totalSlides = slides.length;

    // 1. Create Pagination Dots
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('pagination-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => moveToSlide(index));
        paginationContainer.appendChild(dot);
    });

    const dots = Array.from(document.querySelectorAll('.pagination-dot'));

    // 2. Core Slide Movement Function
    const moveToSlide = (targetIndex) => {
        const slideWidth = slides[0].getBoundingClientRect().width;

        // Move the track by the target slide's index multiplied by its width
        track.style.transform = 'translateX(-' + (targetIndex * slideWidth) + 'px)';

        // Update active class for slides and dots
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            dots[index].classList.remove('active');
        });

        slides[targetIndex].classList.add('active');
        dots[targetIndex].classList.add('active');
        currentSlideIndex = targetIndex;
    };

    // 3. Arrow Button Event Listeners
    nextButton.addEventListener('click', () => {
        let nextIndex = (currentSlideIndex + 1) % totalSlides;
        moveToSlide(nextIndex);
    });

    prevButton.addEventListener('click', () => {
        let prevIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
        moveToSlide(prevIndex);
    });

    // 4. Resize Listener (Crucial for Responsiveness)
    // Ensures the carousel repositions correctly if the window resizes
    window.addEventListener('resize', () => {
        moveToSlide(currentSlideIndex);
    });
});