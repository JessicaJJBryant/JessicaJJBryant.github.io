const track = document.querySelector('.carousel_track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel_button-right');
const prevButton = document.querySelector('.carousel_button-left');
const dotsNav = document.querySelector('.carousel_nav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;



// to arrange the slides next to one another on the carousel (instead of on top of one another as they are when all are in absolute position)
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);

// Setting constant with function to make the slides work with the left and right chevrons
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}
// setting constant with a function to make the slides work with the dot navigation
const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}
// setting constant to hide the chevron (when hiding is needed)
const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}

// to move the slides to the left when the left button is clicked
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);
    // to move to the previous slide
    moveToSlide(track, currentSlide, prevSlide);
    // to update dot when moved
    updateDots(currentDot, prevDot);
    // to hide or show the arrows
    hideShowArrows(slides, prevButton, nextButton, prevIndex);
})

// to move the slides to the right when the right button is clicked
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    // const amountToMove = nextSlide.style.left;
    // to move to the next slide
    moveToSlide(track, currentSlide, nextSlide);
    // to update dot when moved
    updateDots(currentDot, nextDot);
    // to hide or show the arrows
    hideShowArrows(slides, prevButton, nextButton, nextIndex);
})

// To make the dot navigation work:
dotsNav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');

    if (!targetDot) return;

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];
    // to move to the next slide
    moveToSlide(track, currentSlide, targetSlide);
    // to update dots when moved
    updateDots(currentDot, targetDot);
    // to hide or show the arrows
    hideShowArrows(slides, prevButton, nextButton, targetIndex);

})