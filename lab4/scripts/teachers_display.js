import { addRequiredFields, getMockUserData } from "./users.js";
import { formatUserData } from "./users.js";
import { userIsValid } from "./users.js";

export class TeacherDisplay {
    display;
    teachers;

    constructor (displayElement){
        this.display = displayElement;
        this.teachers = [];
    }

    async setWithMockData() {
        let mockUserData = await getMockUserData();
        mockUserData = Object.values(mockUserData);
        mockUserData = formatUserData(mockUserData);
        
        /*
        let validData = [];
        
        mockUserData.forEach(mockUser => {
            console.log("User is valid: ", userIsValid(mockUser));
            if (userIsValid(mockUser)){
                validData.push(mockUser);
            } 
        });
        */

        this.teachers = mockUserData;
        console.log("Teachers: ", this.teachers);
    }
}