import { addRequiredFields, formatUserData, userIsValid } from "./users.js";
import { randomUserMock } from "../assets/config/mock_users.js";

export class TeacherDisplay {
    display;
    teachers;

    constructor (displayElement){
        this.display = displayElement;
        this.teachers = [];
    }

    async setWithMockData() {
        let validData = [];
        let mockUsers = addRequiredFields(randomUserMock);
        mockUsers = formatUserData(randomUserMock);

        console.log("Mock teachers: ", mockUsers);
        
        mockUsers.forEach(mockUser => {
            if (userIsValid(mockUser)){
                validData.push(mockUser);
            }
        });

        this.teachers = validData;
        console.log("Teachers: ", this.teachers);
    }
}