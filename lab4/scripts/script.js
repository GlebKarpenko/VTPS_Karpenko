import { TeacherDisplay } from "./teachers_display.js";
import { TeacherInfo} from "./teacher_info.js";
import { filterUsers } from "./users.js";

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

// Top teachers and favorites
const topTeachers = new TeacherDisplay(document.getElementById("top-teachers"));
topTeachers.setWithMockData();
topTeachers.generateHTML(topTeachers.teachers);

const favoriteTeachers = new TeacherDisplay(document.getElementById("item-slider"));
favoriteTeachers.generateHTML(favoriteTeachers.teachers);

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

function togglePopup(popupID){
    document.getElementById(popupID).classList.toggle('active');
    document.getElementById('page-container').classList.toggle('blured');
}

let teacherInfoControllers = document.querySelectorAll(".teacher-info-controller");
teacherInfoControllers.forEach((item) => {
    item.addEventListener('click', () => togglePopup('teacher-info'));
});

// Filter selectors
const ageSelector = document.getElementById("age-selector");
const regionSelector = document.getElementById("region-selector");
const sexSelector = document.getElementById("sex-selector");
const photoCheck = document.getElementById("photo-check");
const favouritesCheck = document.getElementById("favourites-check");

function handleFilterChange(event) {
    const selectedAge =  ageSelector.value;
    const selectedRegion = regionSelector.value;
    const selectedSex = sexSelector.value;
    const hasPhoto = photoCheck.checked;
    const onlyFavourites = favouritesCheck.checked;

    const filterFields = {};

    if (selectedAge !== 'all') {
        const ageRange = selectedAge.split("-");
        filterFields["dob"] = {
            "age": {
                "min": parseInt(ageRange[0]),
                "max": parseInt(ageRange[1])
            }
        };
    }

    if (selectedRegion !== 'all') {
        filterFields["country"] = selectedRegion; 
    }

    if (selectedSex !== 'all') {
        filterFields["gender"] = selectedSex; 
    }

    if (hasPhoto) {
        filterFields["picture"];
    }

    if (onlyFavourites) {
        filterFields["favorite"] = new Boolean(true);
    }

    console.log(filterFields);

    if (Object.keys(filterFields).length > 0) {
        topTeachers.filter(filterFields);
    }

    topTeachers.generateHTML();
    topTeachers.setWithMockData();
}

ageSelector.addEventListener("change", handleFilterChange);
regionSelector.addEventListener("change", handleFilterChange);
sexSelector.addEventListener("change", handleFilterChange);
photoCheck.addEventListener("change", handleFilterChange);
favouritesCheck.addEventListener("change", handleFilterChange);

// Add teacher popup
let addTeacherControllers = document.querySelectorAll(".add-teacher-controller");

addTeacherControllers.forEach((item) => {
    item.addEventListener('click', () => togglePopup('add-teacher'));
});