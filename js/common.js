//слайдер
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


//спрятать навигационное меню при скролле и отображение кнопки "наверх"
var btn = document.querySelector('.showBtn');
var header = document.querySelector('.header__wrap');

window.addEventListener('scroll', function(){
  var body =  document.documentElement.scrollTop; //кол-во проскролленых пикселей от начала страницы
  //при скролле прячем мобильное меню
  if(body > header.offsetHeight){
    headerList.classList.remove('open-menu');
  }
  //отображаем или прячем кнопку "наверх"
  if(body > 700){
    btn.style.display = 'block';
  }else{
    btn.style.display = 'none';
  }
});

//открытие мобильного меню
var burger = document.querySelector('.open-menu');
var headerList = document.querySelector('.header__list');

burger.addEventListener('click', function(){
  headerList.classList.toggle('open-menu');
});


//скролл по якорным ссылкам
var linkNav = document.querySelectorAll('.header__link, .nextBlock,.scrollbar__dot,.scrollStart') || 0, //выбираем все ссылки к якорю на странице
    V = 0.2;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
if(linkNav){
  for (var i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function(e) { //по клику на ссылку
        e.preventDefault(); //отменяем стандартное поведение
        var w = window.pageYOffset,  // производим прокрутку
            hash = this.href.replace(/[^#]*(.*)/, '$1');  // к id элемента, к которому нужно перейти
        t = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
            start = null;
        requestAnimationFrame(step);  // подробнее про функцию анимации [developer.mozilla.org]
        function step(time) {
            if (start === null) start = time;
            var progress = time - start,
                r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
            window.scrollTo(0,r);
            if (r != w + t) {
                requestAnimationFrame(step)
            } else {
                location.hash = hash  // URL с хэшем
            }
        }
    }, false);
  };
};


//отображение активного пункта меню
var scrollbarLinks = document.querySelectorAll('.scrollbar__dot') || 0;
var headerLinks = document.querySelectorAll('.header__link') || 0;
var idNav = [];

if(headerLinks){
  //достаем значения href из ссылок и пушим в массив
  for(var i = 0; i < headerLinks.length; i++){
    var attr = headerLinks[i].getAttribute('href');
    idNav.push(attr);
  }

  //сохраняем элементы с полученными ссылками
  var anchor_1 = document.querySelector(idNav[0]);
  var anchor_1 = document.querySelector(idNav[1]);
  var anchor_2 = document.querySelector(idNav[2]);
  var anchor_3 = document.querySelector(idNav[3]);


  function viewActiveLink(){
    var body = document.documentElement.scrollTop; //кол-во проскролленых пикселей от начала страницы
    //получаем позицию наших элементов и сравниваем с кол-ом проскролленых пикселей
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

  //активируем активную ссылку
  viewActiveLink();

  window.addEventListener('scroll', function(){
    viewActiveLink();
  });
}

//убираем активные классы
function removeActiveClass(){
  for(var i = 0; i < headerLinks.length; i++){
    scrollbarLinks[i].classList.remove('dot_active');
    headerLinks[i].classList.remove('header__link_active');
  }
}

//добавляем активные классы
function addActiveClass(n){
  scrollbarLinks[n].classList.add('dot_active');
  headerLinks[n].classList.add('header__link_active');
}


//отображение выбранных файлов
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


// валидация e-mail
//регулярное выражение
function validateEmail(email) {
  var pattern  = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return pattern.test(email);
}
//при клике сверяем значение инпута
function validate() {
  var email = document.querySelector('.feedback__input[type="email"]').value;
 
  if (!validateEmail(email)) {
    alert("Некорректный e-mail");
  }
  return false;
}

document.querySelector('.feedback__validate').addEventListener('click', validate);


//модальное окно для кнопки "оформить заявку"
var makeRequest = document.querySelectorAll('.open__modal');
var modal = document.querySelector('.modal');
var modalOverlay = document.querySelector('.modal__overlay_hide');
var modalHideBtn = document.querySelector('.modal__x_hide');

//вешаем событие на каждую кнопку "оформить заявку"
for(var j = 0; j < makeRequest.length; j++){
  makeRequest[j].addEventListener('click', function(){
    modal.style.display = 'block';
  })
};

//при клике на Х или оверлей скрываем модальное окно
modalOverlay.addEventListener('click', hideModal);
modalHideBtn.addEventListener('click', hideModal);
function hideModal(){
  modal.style.display = 'none';
}

