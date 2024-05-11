import dayjs from '../node_modules/dayjs';

export class TeacherInfo {
    constructor (popupElement) {
        this.popupElement = popupElement;
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
        <div id="card-comment">
            ${teacher.note}
        </div>
        <a href="#">toggle map</a>`;

        this.popupElement.innerHTML = template;
    }

    getDaysToBD(dob) {
        const currentDate = dayjs();
        const thisYearDB = dayjs(dob.date).year(currentDate.year());
        const nextBD = thisYearDB > currentDate ? thisYearDB : thisYearDB.add(1, 'year');
        return nextBD.diff(currentDate, "day");
    }
}