import dayjs from '../node_modules/dayjs';
import L from '../node_modules/leaflet';

export class TeacherInfo {
    constructor (popupElement) {
        this.popupElement = popupElement;
        this.mapInitialized = false;
    }

    generateHTML(teacher) {
        let pfpSrc = teacher.picture.large ?? 
            teacher.picture.medium  ?? 
            teacher.picture.thumbnail ?? 
            "assets/aboutus.jpg";

        const daysToBirthDay = this.getDaysToBD(teacher.dob);

        let region = `${teacher.city}, ${teacher.country}`;
        let ageGender = `
            ${teacher.dob.age}, 
            ${teacher.gender}, 
            Days to birthday: ${daysToBirthDay}`;
        let icon = "fa-regular fa-star";

        if (teacher.favorite == true) {
            icon = "fa-solid fa-star";
        }

        const template = `
        <div class="pfp-container">
            <img src="${pfpSrc}" alt="Avatar">
            <a href="#" id="map-toggler">toggle map</a>
        </div>
        <div class="main-info">
            <span id="card-name">${teacher.full_name}</span>
            <i id="add-favorite-${teacher.id}" class="${icon}"></i><br>
            <span id="card-field">${teacher.course}</span><br>
            <span id="card-region">${region}</span><br>
            <span id="card-age-gender">${ageGender}</span><br>
            <span id="card-email">${teacher.email}</span><br>
            <span id="card-phone">${teacher.phone}</span><br>
        </div>
        <div id="map-container">
            <div id="map"></div>
        </div>
        <div id="card-comment">
            ${teacher.note}
        </div>`;

        this.popupElement.innerHTML = template;
    }

    getDaysToBD(dob) {
        const currentDate = dayjs();
        const thisYearDB = dayjs(dob.date).year(currentDate.year());
        const nextBD = thisYearDB > currentDate ? thisYearDB : thisYearDB.add(1, 'year');
        return nextBD.diff(currentDate, "day");
    }

    handleMapToggle(teacher) {
        const mapToggler = document.getElementById("map-toggler");
        mapToggler.addEventListener('click', () => {
            if (!this.mapInitialized) {
                document.getElementById("map-container").style.height = "200px";
                this.addLocationOnMap(teacher.location.coordinates);
                this.mapInitialized = true;
            }
            else {
                document.getElementById("map-container").style.height = "0px";
                this.mapInitialized = false;
            }
        });
    }

    addLocationOnMap(coordinates) {
        let map = L.map("map-container").setView([coordinates.latitude, coordinates.longitude], 8);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">toggle map</a> contributors',
        }).addTo(map);
    
        L.marker([coordinates.latitude, coordinates.longitude]).addTo(map);    
    }
}