import { 
    addRequiredFields, 
    formatUserData, 
    userIsValid, 
    filterMatchingUsers, 
    filterUsers, 
} from "./users.js";
import { randomUserMock } from "../assets/config/mock_users.js";

export class TeacherDisplay {
    displayElement;
    teachers;

    constructor (displayElement){
        this.displayElement = displayElement;
        this.teachers = [];
    }

    setWithMockData() {
        this.teachers = this.formatData(randomUserMock);
    }

    formatData(data) {
        let validData = [];
        data = addRequiredFields(data);
        data = formatUserData(data);
        data.forEach(userData => {
            if (userIsValid(userData)) {
                validData.push(userData);
            }
        })

        return validData;
    }

    setWithData(data) {
        if (data.length > 0) {
            this.teachers = this.formatData(data);
        }
        else {
            this.setWithMockData();
        }
    }

    generateHTML(){
        let template = ``;

        this.teachers.forEach(teacher => {
            const gridItem = new GridItem(teacher);
            template += gridItem.generateHTML();
        });

        this.displayElement.innerHTML = template;
    }

    removeTeacher(index) {
        this.teachers.splice(index, 1);
        this.generateHTML();
    }

    addTeacher(teacher){
        this.teachers.push(teacher);
        this.generateHTML();
    }

    filter(filterFields) {
        this.teachers = filterUsers(this.teachers, filterFields);
    }

    getMatching(searchedValue) {
        const values = [
            {"full_name": searchedValue},
            {"age": searchedValue},
            {"note": searchedValue}
        ];

        let searchedTeachers = [];

        for (const value of values) {
            const filteredByField = filterMatchingUsers(this.teachers, value);
            if (filteredByField.length > 0) {
                searchedTeachers = searchedTeachers.concat(filteredByField);
            }
        }

        return searchedTeachers;
    }
}

class GridItem {
    constructor (teacher) {
        this.teacher = teacher;
        this.id = `teacher-card-${teacher.id}`;
    }

    generateHTML() {
        const firstName = this.teacher.full_name.split(' ').slice(0, -1).join(' ');
        const lastName = this.teacher.full_name.split(' ').slice(-1).join(' ');
        
        let imageSrc = this.teacher.picture.large ?? 
            this.teacher.picture.medium  ?? 
            this.teacher.picture.thumbnail ?? 
            "assets/aboutus.jpg";

        const field = this.teacher.course;
        const region = this.teacher.country;

        return `                        
        <div class="grid-item">
            <div class="image-wrapper">
                <img src="${imageSrc}" id="${this.id}" alt="Avatar">
            </div>
            <span class="first-name">${firstName}</span>
            <span class="last-name">${lastName}</span>
            <span class="field">${field}</span>
            <span class="region">${region}</span>
        </div>`;
    }
}