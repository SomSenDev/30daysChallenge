// Get references to HTML elements
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const indicatorsContainer = document.querySelector('.indicators');

// Initialize current slide index
let currentSlide = 0;

// Create indicators for each slide
slides.forEach((slide, index) => {
  const indicator = document.createElement('li');
  indicator.classList.add('indicator');
  // Set the initial active indicator
  if (index === currentSlide) {
    indicator.classList.add('active');
  }
  indicatorsContainer.appendChild(indicator);
});

// Get references to the indicator elements
const indicators = document.querySelectorAll('.indicator');

// Function to change slide based on direction
function changeSlide(direction) {
  // Increment/decrement the current slide index
  currentSlide += direction;
  // Wrap around to the first/last slide if needed
  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  } else if (currentSlide >= slides.length) {
    currentSlide = 0;
  }
  // Update the slider display and indicators
  updateSlider();
  updateIndicators();
}

// Function to update the slider's position
function updateSlider() {
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Function to update the active indicator
function updateIndicators() {
  indicators.forEach((indicator, index) => {
    if (index === currentSlide) {
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }
  });
}

// Add click event listeners to previous and next buttons
prevBtn.addEventListener('click', () => {
  changeSlide(-1); // Move to the previous slide
});

nextBtn.addEventListener('click', () => {
  changeSlide(1); // Move to the next slide
});

// Set automatic slide change interval (3 seconds)
const autoSlideInterval = 3000; // Change slide every 3 seconds

// Function for automatic slide change
function autoChangeSlide() {
  changeSlide(1); // Move to the next slide
}

// Set interval for automatic slide change
setInterval(autoChangeSlide, autoSlideInterval);

// Initial update of slider and indicators
updateSlider();
updateIndicators();
