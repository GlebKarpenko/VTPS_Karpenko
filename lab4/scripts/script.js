// Task 3
const leftButton = document.getElementById("slide-left");
const rightButton = document.getElementById("slide-right");
const itemSlider = document.getElementById("item-slider");
let addTeacherControllers = document.querySelectorAll(".add-teacher-controller");
let teacherInfoControllers = document.querySelectorAll(".teacher-info-controller");
let imageWrappers = document.querySelectorAll(".imageWrapper");

let hoverTimer;

leftButton.addEventListener('click', () => {
    itemSlider.scrollBy({
        left: -150,
        behavior: 'smooth'
    });
});

rightButton.addEventListener('click', () => {
    itemSlider.scrollBy({
        left: 150,
        behavior: 'smooth'
    });
});

addTeacherControllers.forEach((item) => {
    item.addEventListener('click', () => togglePopup('add-teacher'));
});

teacherInfoControllers.forEach((item) => {
    item.addEventListener('click', () => togglePopup('teacher-info'));
});

imageWrappers.forEach((item) => {
    item.addEventListener('click', function(event) {
        if (event.target.classList.contains('teacher-info-controller')) {
            togglePopup('teacher-info');
        }
    });
});

function togglePopup(popupID){
    document.getElementById(popupID).classList.toggle('active');
    document.getElementById('page-container').classList.toggle('blured');
}

// Change the src attribute to the hover image with timed delay and animation
function changeLogo(imgSrc) {
    clearTimeout(hoverTimer);
    let logo = document.getElementById('logo');
    logo.style.opacity = '0';

    hoverTimer = setTimeout(function() {
        logo.src = imgSrc;
        logo.style.opacity = '1';
    }, 300);
}