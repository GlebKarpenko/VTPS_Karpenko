import { TeacherDisplay } from "./teachers_display.js";
import { TeacherInfo} from "./teacher_info.js";
import { StatisticsTable } from "./statistics_table.js";
import { formatUserData} from "./users.js";

const leftButton = document.getElementById("slide-left");
const rightButton = document.getElementById("slide-right");
const itemSlider = document.getElementById("item-slider");

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
            togglePopup('teacher-info');
            addFavoritesListener();
        });

        togglePopup('teacher-info');
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

    if (Object.keys(filterFields).length > 0) {
        topTeachers.filter(filterFields);
    }

    topTeachers.generateHTML();
    addTeacherInfoListeners();
    addFavoritesListener();
    topTeachers.setWithMockData();
}

ageSelector.addEventListener("change", handleFilterChange);
regionSelector.addEventListener("change", handleFilterChange);
sexSelector.addEventListener("change", handleFilterChange);
photoCheck.addEventListener("change", handleFilterChange);
favouritesCheck.addEventListener("change", handleFilterChange);

function addSearchListener() {
    const searchInput = document.getElementById("search-value");
    const searchButton = document.getElementById("search-button");

    searchButton.addEventListener("click", () => {
        if (searchInput.value === ""){
            return;
        }

        const searchResult = topTeachers.getMatching(searchInput.value);

        topTeachers.teachers = searchResult;
        topTeachers.generateHTML();
        addTeacherInfoListeners();
        addFavoritesListener();
        topTeachers.setWithMockData();
    });
}

addSearchListener();

// Statistics table
const tableElement = document.getElementById("statistics");
let teacherStatisticDisplay = new TeacherDisplay(tableElement);
teacherStatisticDisplay.setWithMockData();
const statisticsData = teacherStatisticDisplay.teachers;

const tableBodyElement = document.getElementById("statistics-body");
let statistics = new StatisticsTable(tableElement, tableBodyElement, statisticsData);

statistics.displayPage(1, 10);

// Add teacher popup
let addTeacherControllers = document.querySelectorAll(".add-teacher-controller");

addTeacherControllers.forEach((item) => {
    item.addEventListener('click', () => togglePopup('add-teacher'));
});

let addTeacherForm = document.getElementById("add-teacher-form");
addTeacherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let formData = {};
    const userFields = ["full_name", "course", "country", "city", "email", "phone", "dob", "gender", "bg_color", "note"];
    const formFields = ["full-name", "speciality", "country", "city", "email", "phone", "dob", "sex", "select-color", "comment"];

    for (let i = 0; i < userFields.length; i++) {
        if (formFields[i] === "sex") {
            formData[userFields[i]] = getSelectedCheckboxValue(); 
        } else {
            formData[userFields[i]] = document.getElementById(formFields[i]).value;
        }
    }

    formData["age"] = calculateAge(formData.dob); 
    addFormTeacher(formData);
    togglePopup('add-teacher');
});

function getSelectedCheckboxValue(){
    const checkboxes = document.querySelectorAll('.sex-check');
    let selectedValue = "None";

    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selectedValue = checkboxes[i].parentElement.textContent.trim()
            break;
        }
    }

    return selectedValue;
}

function calculateAge(dob) {
    const dobDate = new Date(dob);
    let diff_ms = Date.now() - dobDate.getTime();
    let age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

function addFormTeacher(formData) {
    formData["state"] = "None";

    if (!formData.hasOwnProperty("picture")) {
        formData["picture"] = {};
        formData["picture"]["large"] = "assets/aboutus.jpg";
    }

    formData = formatUserData([formData])[0];
    topTeachers.addTeacher(formData);
    topTeachers.generateHTML();
    addTeacherInfoListeners();
    addFavoritesListener();
}