'use: strict';

// ///////////////////////////////////////
// // Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const navbar = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// ///////////////////////////////////////
// // Page Navigation

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Nav animation
const handleHover = function (event) {
  if (event.target.classList.contains('nav__link')) {
    const link = event.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach((element) => {
      if (element !== link) {
        element.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};

// navbar.addEventListener('mouseover', (e) => handleHover(e, 0.5));
// navbar.addEventListener('mouseout', (e) => handleHover(e, 1));

navbar.addEventListener('mouseover', handleHover.bind(0.5));
navbar.addEventListener('mouseout', handleHover.bind(1));

// ///////////////////////////////////////
// // tabbed content

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  tabs.forEach((tab) => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  tabsContent.forEach((content) =>
    content.classList.remove('operations__content--active')
  );
  const contentTarget = document.querySelector(
    `.operations__content--${clicked.dataset.tab}`
  );
  contentTarget.classList.add('operations__content--active');
});

// ///////////////////////////////////////
// // sticky navbar

const header = document.querySelector('.header');
const navBarHeight = navbar.getBoundingClientRect().height;

// entries is object passed when observer is triggered
const stickyNav = (entries) => {
  const [entry] = entries;
  if (!entry.isIntersecting) navbar.classList.add('sticky');
  else navbar.classList.remove('sticky');
};

const headObserveOptions = {
  root: null,
  rootMargin: `-${navBarHeight}px`,
  threshold: 0,
};

const observeHeader = new IntersectionObserver(stickyNav, headObserveOptions);
observeHeader.observe(header);

// ///////////////////////////////////////
// // reveal sections

const allSections = document.querySelectorAll('.section');

const revealSection = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserveOptions = {
  root: null,
  threshold: 0.2,
};
const observeSection = new IntersectionObserver(
  revealSection,
  sectionObserveOptions
);

allSections.forEach((section) => {
  observeSection.observe(section);
  section.classList.add('section--hidden');
});

// ///////////////////////////////////////
// // lazy loading images

const lazyImages = document.querySelectorAll('img[data-src]');
const lazyImageObserveOptions = {
  root: null,
  threshold: 0,
  rootMargin: '200px',
};
const revealLazyImage = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const observeLazyImage = new IntersectionObserver(
  revealLazyImage,
  lazyImageObserveOptions
);

lazyImages.forEach((image) => observeLazyImage.observe(image));

// ///////////////////////////////////////
// // slider component

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const sliderBtnLeft = document.querySelector('.slider__btn--left');
const sliderBtnRight = document.querySelector('.slider__btn--right');
const maxSlides = slides.length;
let currentSlide = 0;

const goToSlide = (curSlide) => {
  slides.forEach(
    (slide, index) =>
      (slide.style.transform = `translateX(${(index - curSlide) * 100}%)`)
  );
};
goToSlide(0);

const nextSlide = () => {
  if (currentSlide === maxSlides - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
};

const prevSlide = () => {
  if (currentSlide === 0) {
    currentSlide = maxSlides - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
};

sliderBtnRight.addEventListener('click', nextSlide);
sliderBtnLeft.addEventListener('click', prevSlide);
