import { addRequiredFields, formatUserData, userIsValid } from "./users.js";
import { randomUserMock } from "../assets/config/mock_users.js";

export class TeacherDisplay {
    displayElement;
    teachers;

    constructor (displayElement){
        this.displayElement = displayElement;
        this.teachers = [];
    }

    setWithMockData() {
        let validData = [];
        let mockUsers = addRequiredFields(randomUserMock);
        mockUsers = formatUserData(randomUserMock);
        
        mockUsers.forEach(mockUser => {
            if (userIsValid(mockUser)){
                validData.push(mockUser);
            }
        });

        this.teachers = validData;
    }

    generateHTML(){
        this.teachers.forEach(teacher => {
            const firstName = teacher.full_name.split(' ').slice(0, -1).join(' ');
            const lastName = teacher.full_name.split(' ').slice(-1).join(' ');
            
            let pfp = teacher.picture.large ?? 
                teacher.picture.medium  ?? 
                teacher.picture.thumbnail ?? 
                "assets/aboutus.jpg";

            const gridItem = new GridItem(
                firstName, 
                lastName, 
                teacher.course,
                teacher.country,
                pfp
            );

            this.displayElement.innerHTML += gridItem.generateHTML();
        });
    }
}

class GridItem {
    constructor (firstName, lastName, field, region, imageSrc) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.field = field;
        this.region = region;
        this.imageSrc = imageSrc;
    }

    generateHTML() {
        return `                        
        <div class="grid-item">
            <div class="image-wrapper">
                <img src="${this.imageSrc}" class="teacher-info-controller" alt="Avatar">
            </div>
            <span class="first-name">${this.firstName}</span>
            <span class="last-name">${this.lastName}</span>
            <span class="field">${this.field}</span>
            <span class="region">${this.region}</span>
        </div>`;
    }
}