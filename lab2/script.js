// Task 3
let popupControllerButtons = document.querySelectorAll(".popup-controller");

let popupDisplayController = () => {
    let popupMenu = document.querySelector('.popup');
    if (popupMenu.style.display === 'none' || popupMenu.style.display === '') {
        popupMenu.style.display = 'block';
        console.log('clicked');
    } else {
        popupMenu.style.display = 'none';
    }
}

popupControllerButtons.forEach((item) => {
    item.addEventListener('click', popupDisplayController);
})

let hoverTimer;

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