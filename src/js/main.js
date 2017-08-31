var slideNow = 1;
var slideCount = document.querySelectorAll('.slide').length;
var slideWrapper = document.querySelector('.slidewrapper');
var viewport = document.querySelector('.viewport');
var translateWidth = 0;
var slideInterval;
var prevBtn = document.querySelector('.prev-btn');
var nextBtn = document.querySelector('.next-btn');
var slideNavBtn = document.querySelectorAll('.slide-nav-btn');

var btnMenu = document.getElementById('btn');
var mainMenu = document.getElementById('main-menu');
 
function menu() { 
  btnMenu.classList.toggle('active');
  mainMenu.classList.toggle('menu-small');
}

function init() {
  slideInterval = setInterval(nextSlide, 1800);
}
 
function active() {
  for(var i = 0; i < slideNavBtn.length; i++) {
    var currentSlide = slideNavBtn[i];
    
    if(currentSlide.classList.contains('active-slide-btn')) {
      currentSlide.classList.remove('active-slide-btn');
    }
  }
  
  slideNavBtn[slideNow - 1].classList.add('active-slide-btn');
}

function transform(countNumber) {
  var viewportStyle = window.getComputedStyle(viewport);
  translateWidth = -parseInt(viewportStyle.width) * countNumber + 'px';
  slideWrapper.style.transform = 'translate('+ translateWidth +', 0)';
}

function nextSlide() {
  if(slideNow == slideCount) {
    slideWrapper.style.transform = 'translate(0, 0)';
    slideNow = 1;
  } else {
    transform(slideNow);
    slideNow++;
  }
  
  active();
}

function prevSlide() {
  if(slideNow == 1) {
    transform(slideCount - 1);
    slideNow = slideCount;
  } else {
    transform(slideNow - 2);
    slideNow--;
  }
  
  active();
} 

function slider(event) {
  var currentBtn = event.target;
  
  if(currentBtn.classList.contains('slide-nav-btn')) {
    var navBtnId = currentBtn.dataset.numberSlide;
    
    if(navBtnId != slideNow) {
      transform(navBtnId - 1);
      slideNow = navBtnId;
      active();
    }
  }
  
  if(currentBtn.classList.contains('prev-btn')) {
    prevSlide();
  }
  
  if(currentBtn.classList.contains('next-btn')) {
    nextSlide();
  }
}

    
window.onload = function() {
  init();

  btnMenu.addEventListener('click', menu);

  viewport.addEventListener('click', slider);

  viewport.addEventListener('mouseover', function() {
    clearInterval(slideInterval);  
})
  
viewport.addEventListener('mouseout', function() {
    init();
})

}    