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

var fps = 15;
 
function menu() { 
  btnMenu.classList.toggle('active');
  mainMenu.classList.toggle('menu-small');
}

function init() {
  slideInterval = setTimeout(function initSlide() {
    nextSlide();
    slideInterval = setTimeout(initSlide, 2000)
  }, 2000);
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

  clearInterval(slideInterval);

  if(currentBtn.classList.contains('slide-img')) {
    var elementId = currentBtn.dataset.itemId;
    var element = document.getElementById(elementId);
    scrollToElement(element);
  }
  
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

  init();

}

function scrollToElement(el) {
  var posX = el.offsetLeft;
  var posY = el.offsetTop;
  var i = 15;

  var int = setInterval(function() {
    window.scrollTo(posX, i);
    
    i +=15;

    if(i >= posY) {
      clearInterval(int);
    }
  }, 10)
}


    
window.onload = function() {
  init();

  btnMenu.addEventListener('click', menu);

  viewport.addEventListener('click', slider);

}    