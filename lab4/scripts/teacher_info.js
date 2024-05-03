export class TeacherInfo {
    constructor (popupElement) {
        this.popupElement = popupElement;
    }

    generateHTML(teacher) {
        let pfpSrc = teacher.picture.large ?? 
            teacher.picture.medium  ?? 
            teacher.picture.thumbnail ?? 
            "assets/aboutus.jpg";

        let region = `${teacher.city}, ${teacher.country}`;
        let ageGender = `${teacher.dob.age}, ${teacher.gender}`;
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
}