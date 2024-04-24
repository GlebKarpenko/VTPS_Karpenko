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
