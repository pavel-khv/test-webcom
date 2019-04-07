//slider
var mySwiper = new Swiper('.swiper-container', {
  speed: 700,
  spaceBetween: 100,
  touchRatio: 0,
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  }
});


//hide the navigation menu when scrolling and display the top button
var btn = document.querySelector('.showBtn');
var header = document.querySelector('.header__wrap');

window.addEventListener('scroll', function(){
  var body =  document.documentElement.scrollTop; //number of scrolled pixels from the beginning of the page
  //when scrolling hide mobile menu
  if(body > header.offsetHeight){
    headerList.classList.remove('open-menu');
  }
  //display or hide the "top" button
  if(body > 700){
    btn.style.display = 'block';
  }else{
    btn.style.display = 'none';
  }
});

//open burger menu
var burger = document.querySelector('.open-menu');
var headerList = document.querySelector('.header__list');

burger.addEventListener('click', function(){
  headerList.classList.toggle('open-menu');
});


//scrolling for anchor links
var linkNav = document.querySelectorAll('.header__link, .nextBlock,.scrollbar__dot,.scrollStart') || 0, //select all anchor links on the page
    V = 0.2;  // speed can have a fractional value through the point (the lower the value - the greater the speed)
if(linkNav){
  for (var i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function(e) { //by clicking on the link
        e.preventDefault(); //cancel the standard behavior
        var w = window.pageYOffset,  // we make scrolling
            hash = this.href.replace(/[^#]*(.*)/, '$1');  // for id element
        t = document.querySelector(hash).getBoundingClientRect().top,  // the offset from the browser window id
            start = null;
        requestAnimationFrame(step);  // learn more about the animation feature [developer.mozilla.org]
        function step(time) {
            if (start === null) start = time;
            var progress = time - start,
                r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
            window.scrollTo(0,r);
            if (r != w + t) {
                requestAnimationFrame(step)
            } else {
                location.hash = hash  // URL with hash
            }
        }
    }, false);
  };
};


//display the active menu item
var scrollbarLinks = document.querySelectorAll('.scrollbar__dot') || 0;
var headerLinks = document.querySelectorAll('.header__link') || 0;
var idNav = [];

if(headerLinks){
  //get the href values from the links and push into the array
  for(var i = 0; i < headerLinks.length; i++){
    var attr = headerLinks[i].getAttribute('href');
    idNav.push(attr);
  }

  //save the elements with the received links
  var anchor_1 = document.querySelector(idNav[0]);
  var anchor_1 = document.querySelector(idNav[1]);
  var anchor_2 = document.querySelector(idNav[2]);
  var anchor_3 = document.querySelector(idNav[3]);


  function viewActiveLink(){
    var body = document.documentElement.scrollTop; //number of scrolled pixels from the beginning of the page
    //get the position of our elements and compare with the number of scrolled pixels
    if(body >= anchor_1.offsetTop - 1 && body < anchor_2.offsetTop){
      removeActiveClass();
      addActiveClass(1);
    }else if(body >= anchor_2.offsetTop - 1 && body < anchor_3.offsetTop){
      removeActiveClass();
      addActiveClass(2);
    }else if(body >= anchor_3.offsetTop - 1){
      removeActiveClass();
      addActiveClass(3);
    }else{
      removeActiveClass();
      addActiveClass(0);
    }
  };

  //activate the active link
  viewActiveLink();

  window.addEventListener('scroll', function(){
    viewActiveLink();
  });
}

//remove active classes
function removeActiveClass(){
  for(var i = 0; i < headerLinks.length; i++){
    scrollbarLinks[i].classList.remove('dot_active');
    headerLinks[i].classList.remove('header__link_active');
  }
}

//add active classes
function addActiveClass(n){
  scrollbarLinks[n].classList.add('dot_active');
  headerLinks[n].classList.add('header__link_active');
}


//display the selected files
var inputs = document.querySelectorAll('#file');

Array.prototype.forEach.call(inputs, function(input){
	var label	 = document.querySelectorAll('.feedback__addFile'),
		labelVal = label.innerHTML;

	input.addEventListener('change', function(e)
	{
		var fileName = '';
		if(this.files && this.files.length > 1){
      fileName = (this.getAttribute('data-multiple-caption') || '' ).replace('{count}', this.files.length);
    }
		else{
      fileName = e.target.value.split('\\').pop();
    }

		if(fileName){
      document.querySelector('.feedback__uploadFiles').innerHTML = fileName;
    }
		else{
      label.innerHTML = labelVal;
    }
	});
});


// validation e-mail
//regular expression
function validateEmail(email) {
  var pattern  = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return pattern.test(email);
}
//when clicking verify the value of the input
function validate() {
  var email = document.querySelector('.feedback__input[type="email"]').value;
 
  if (!validateEmail(email)) {
    alert("Некорректный e-mail");
  }
  return false;
}

document.querySelector('.feedback__validate').addEventListener('click', validate);


//modal window for button "apply now"
var makeRequest = document.querySelectorAll('.open__modal');
var modal = document.querySelector('.modal');
var modalOverlay = document.querySelector('.modal__overlay_hide');
var modalHideBtn = document.querySelector('.modal__x_hide');

//add the event on each button "place an order"
for(var j = 0; j < makeRequest.length; j++){
  makeRequest[j].addEventListener('click', function(){
    modal.style.display = 'block';
  })
};

//when you click on X or overlay hide modal window
modalOverlay.addEventListener('click', hideModal);
modalHideBtn.addEventListener('click', hideModal);
function hideModal(){
  modal.style.display = 'none';
}

