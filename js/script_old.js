'Use strict';

window.addEventListener('DOMContentLoaded', () => {

    //Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsPerent =  document.querySelector('.tabheader__items'); 

   // функция, которая устанавливает невидимость для табов
    function hideTabContent() {
        tabsContent.forEach(item => {
           // item.style.display = 'none'; // 1 вариант присвоения стиля
           // 2  вариант, используем классы из css файла,
           item.classList.add('hide');  //добавляем класс hide (невидимость)
           item.classList.remove(('show' , 'fade')); // удаляем класс show (видимость) и fade (анимация)
        });

        // удаляем у таба класс активности tabheader__item_active
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
    }

    
    // функция, показывающая табы
    function showTabContent(i = 0) { // i =0 - так  можно установить дефолтное значение , если вдруг параметр никаки=ой не передадут
        // tabsContent[i].style.display = 'block';
        // tabs[i].classList.add('tabheader__item_active');

        // будем использовать стили Для класов из файла css
        tabsContent[i].classList.add('show' , 'fade'); // класс fade - это анимация, тоже из файла css
        tabsContent[i].classList.remove('hide'); // удаляем класс hide (невидимость)
        tabs[i].classList.add('tabheader__item_active');
    }

    // Делегируем события
    tabsPerent.addEventListener('click' , (event) => {
        const target =  event.target;

        //Перебираем все табы и если таб совпал с событием клин(т.е кликнули на него). 
        //то  для него и срабатывают методы 
        if (target && target.classList.contains('tabheader__item')){
        tabs.forEach((item, i) => {
            if (target == item) {
                hideTabContent();
                showTabContent(i);
            }
        });
    }
});

//Timer

const deadline = '2024-06-30';

function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());


    if(t <= 0) { 
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
    } else {
    // вычисляем сколько дней осталось до даты t
          days = Math.floor(t / (1000 * 60 * 60 * 24) ), // делим время на кол-во миллисекунд в сутках  и округляем в большую сторону
          hours = Math.floor((t / (1000 * 60 *60) % 24)), // Получаем часы, остаток от полных суток
          minutes = Math.floor((t / 1000 / 60) % 60),
          seconds =  Math.floor((t / 1000 ) % 60);
    }

          return {
            'total': t, 
            'days': days ,
            'hours' : hours,
            'minutes': minutes,
            'seconds': seconds
          };
 }

// Добавялем нуль к дате, если оно меньше 10
 function getZero(num) {
    if (num >= 0 &&  num < 10) {
        return "0" + num;
    } else return num;
 }

 // устанавдиваем время в поле для таймера
 function setClock(selector , endtime) {
    const timer =  document.querySelector(selector)
           days =  timer.querySelector('#days'),
           hours =  timer.querySelector('#hours'),
           minutes =  timer.querySelector('#minutes'),
           seconds =  timer.querySelector('#seconds'),
           timerInterval =  setInterval(updateClock, 1000); // обновляем время каждую секунду

    updateClock();

    // обновляем время
    function updateClock() {
        const t = getTimeRemaining(endtime);

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        // если остаток времени меньше или равно ноль, то прекращаем обновлять время 
        if (t.total <= 0 ) {
            clearInterval(timerInterval);
        }
    }
 }

 // в функцию передаем селектор, в который установить дату и время окончания акции
 setClock('.timer', deadline);

 //Modal
 const modalTrigger = document.querySelectorAll('[data-modal]'),
       modal =  document.querySelector('.modal');
    
       

function openModal() {
    modal.classList.add('show'); // добавляем класс show в модальное окно , т.е  деалем его видимым
    modal.classList.remove('hide'); // удаляем  класс hide в модальное окно , т.е удаляем класс невидимости
    // // 2 вариант
    // modal.classList.toggle('show');

    /////
    document.body.style.overflow = 'hidden'; // запрещаем окно прокручиваться скоролом после открытия модального окна, т.е как бы замораживаем его
    // если пользователь сам открыл модальное окно, то мы очищаем паузу modalTimerId, т.е не будем открывать его. после 3 секунд нахождения на сайте
    clearInterval(modalTimerId); 
}
 
modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
})


    function closeModal() {
        // 1 вариант
        modal.classList.add('hide'); // удаляем  класс hide в модальное окно , т.е удаляем класс невидимости
        modal.classList.remove('show'); // добавляем класс show в модальное окно , т.е  деалем его видимым
        //// 2 вариант
        // modal.classList.toggle('show');
        
        ///////
        document.body.style.overflow = ''; // восстанавливаем скрол на странице после закрытия модального окна
};

modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close' = '')) {// если область клика будет по любому месту класса за пределами модального окна (на подложку)
        closeModal();
    }
});

// навешиваем событие на действие на клавиатуре , нажатие на ESC
document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList .contains('show')) { // Проверяем если ивент равен коду кнопки ESC И контекс модоального окна равен show (окно открыто)
        closeModal();
    }
}); 

// устанавливаем открытие модального окна после нахождения на сайте в течени 3 секунд
const modalTimerId = setTimeout(openModal,50000);

// если пользователь долистал страницу до конца. покаывать ему модальное окно
function showModalByScroll() {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal();
        window.removeEventListener('scroll', showModalByScroll); // удалим обработчик, после того как пользователью один раз покажется модальное окно
    }
};
window.addEventListener('scroll', showModalByScroll);
 

 // Используем классы для создание карточек меню

 class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);
        this.transfer = 27;
        this.changeToUAH(); 
    }

    changeToUAH() {
        this.price = this.price * this.transfer; 
    }

    render() {
        const element = document.createElement('div');

        if (this.classes.length === 0) {
            this.classes = "menu__item";
            element.classList.add(this.classes);
        } else {
            this.classes.forEach(className => element.classList.add(className));
        }

        element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        `;
        this.parent.append(element);
    }
}
new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    ".menu .container"
).render();

new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    14,
    ".menu .container"
).render();

new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    21,
    ".menu .container"
).render();


//Forms
// отправялем на сервер POST запрос с данными из формы (Имя и телефон в нашем случае)
const forms =  document.querySelectorAll('form');
const message = {
    loading: '/img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся!',
    failure: 'Что-то пошло не так...'
}

forms.forEach(item => {
    postData(item);
})

function postData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // удаляем дефолтное поведение браузера

        const statusMessage = document.createElement('div');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
        `;
        form.append(statusMessage);
        form.insertAdjacentElement('afterend',  statusMessage);

        const request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        const formData = new FormData(form); // в html в форме из которой мы будем получать данные. 
                                             //обязательно у всех данных дожен быть атрибут name!!
        //request.setRequestHeader('Content-type', 'multipart/form-data'); !!!!!!header передавать не надо яесли на бэк передаем не через json, иначе может не отпарвить на сервер данные
        
        request.setRequestHeader('Content-type', 'application/json'); // Для Json нужен заголовок
        formData.forEach(function(value, key) {
            object[key] = value;
        });

        const json = JSON.stringify(object);
        
        request.send(json);

        request.addEventListener('load', () => {
            if (request.status === 200) {
            console.log(request.response);
            showThanksModal(message.success);
            form.reset();         
            statusMessage.remove();
            } else {
                showThanksModal(message.failure);
            }
        })

    })
}

function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal_dialog');

    prevModalDialog.classList.add('.hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal_dialog');
    thanksModal.innerHTML = `
    <div class="modal__content">
                    <div data-close class="modal__close">&times;</div>
                    <div class="modal__title">${message}</div>
            </div>
    `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(()=> {
        thanksModal.remove();
        prevModalDialog.classList.add('.show');
        prevModalDialog.classList.remove('.hide');
        closeModal();
    }, 4000)

}

});