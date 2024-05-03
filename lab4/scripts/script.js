import { TeacherDisplay } from "./teachers_display.js";
import { TeacherInfo} from "./teacher_info.js";

const leftButton = document.getElementById("slide-left");
const rightButton = document.getElementById("slide-right");
const itemSlider = document.getElementById("item-slider");

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

const topTeachers = new TeacherDisplay(document.getElementById("top-teachers"));
topTeachers.setWithMockData();
topTeachers.generateHTML();

const favoriteTeachers = new TeacherDisplay(document.getElementById("item-slider"));
favoriteTeachers.generateHTML();

addTeacherInfoListeners();

// Open teacher's info card on grid image click.
function addTeacherInfoListeners() {
    topTeachers.teachers.forEach((teacher) => {
        toggleTeacherInfo(teacher);
    });
}

function addFavoritesListener() {
    favoriteTeachers.teachers.forEach((teacher) => {
        toggleTeacherInfo(teacher);
    });
}

function toggleTeacherInfo(teacher) {
    let gridImage = document.getElementById(`teacher-card-${teacher.id}`);
    gridImage.addEventListener('click', () => {
        const teacherInfo = new TeacherInfo(document.getElementById("teacher-info-content"));
        teacherInfo.generateHTML(teacher);

        const addToFavorites = document.getElementById(`add-favorite-${teacher.id}`);
        addToFavorites.addEventListener('click', () => {
            toggleFavoriteStatus(teacher);
            togglePopup();
            addFavoritesListener();
        });

        togglePopup();
    });
}

function toggleFavoriteStatus(teacher) {
    const index = favoriteTeachers.teachers.findIndex(item => item.id === teacher.id);
    const teacherInfo = new TeacherInfo(document.getElementById("teacher-info-content"));

    if (index !== -1) {
        favoriteTeachers.removeTeacher(index);
        teacher.favorite = new Boolean(false);
    }
    else {
        favoriteTeachers.addTeacher(teacher);
        teacher.favorite = new Boolean(true);
    }

    teacherInfo.generateHTML(teacher);
}

function togglePopup(){
    document.getElementById("teacher-info").classList.toggle('active');
    document.getElementById('page-container').classList.toggle('blured');
}

let teacherInfoControllers = document.querySelectorAll(".teacher-info-controller");
teacherInfoControllers.forEach((item) => {
    item.addEventListener('click', () => togglePopup('teacher-info'));
});




let addTeacherControllers = document.querySelectorAll(".add-teacher-controller");

addTeacherControllers.forEach((item) => {
    item.addEventListener('click', () => togglePopup('add-teacher'));
});