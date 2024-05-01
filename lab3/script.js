import { randomUserMock, additionalUsers } from "./FE4U-Lab3-mock.js";

//
//----------------Task 1----------------
//

function addRequiredFields(objectArray) {
    const requiredFields = ["full_name", "gender", "note", "state", "city", "country", "favorite"];

    for (const obj of objectArray) {
        for (const field of requiredFields) {
            if (!(field in obj)) {
                obj[field] = null;
            }
        }
    }

    return objectArray;
}

function formatUserData(objects = []) {
    const courses = ["Mathematics", "Physics", "English", "Computer Science", "Dancing", "Chess", "Biology", "Chemistry", "Law", "Art", "Medicine", "Statistics"];
    let id = 0;
    
    objects.forEach(object => {
        try {
            id++;
            object.id = id;
            const randomIndex = Math.floor(Math.random() * courses.length);
            object.course = courses[randomIndex];
            object.full_name ??= `${object.name.first} ${object.name.last}`;
            object.gender ??= "None";
            object.gender = converGenderToStandart(object.gender);     
            object.note ??= `This is ${object.course} teacher.`;
            object.state ??= object.location.state;
            object.city ??= object.location.city;
            object.country ??= object.location.country;
            object.favorite ??= new Boolean(false);
            object.bg_color = "#f9f5f9";
        } catch(error) {
            console.log("Could not format this user! Not enough data.", error);
        }
    });

    return objects;
}

function converGenderToStandart(gender) {
    const male = "Male";
    const female = "Female";
    const maleRegex = /^(m|male)$/i;
    const femaleRegex = /^(f|female)$/i;

    if (maleRegex.test(gender)) {
        return male;
    }
    if (femaleRegex.test(gender)) {
        return female
    }
    return "None";
}

console.log("\nTask1");
console.log("Formated objects: ");
let mockObjects = [...randomUserMock, ...additionalUsers]
mockObjects = addRequiredFields(mockObjects);
mockObjects = formatUserData(mockObjects);

//
//----------------Task 2----------------
//

function userIsValid(user) {
    const requiredFields = ["full_name", "gender", "note", "state", "city", "country"];
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;

    try {
        for (let field of requiredFields) {
            if (typeof user[field] !== 'string'  
            || user[field].charAt(0) !== user[field].charAt(0).toUpperCase()) {
                return false;
            }
        }
    
        if (typeof user.dob.age !== "number") {
            return false;
        }
    
        if (!phoneRegex.test(user.phone)){
            return false
        }
    
        if (!emailRegex.test(user.email)) {
            return false;
        }

        return true;
    } catch (error) {
        console.log(`User with id: ${user.id} is not valid! `, error);
    }
    return false;
}

console.log("\nTask2");
console.log(`User with name ${mockObjects[6].full_name} is valid: ${userIsValid(mockObjects)}`);

//
//----------------Task 3----------------
//

function filterUsers(users, filterFields) {
    return users.filter(user => {
        for (let field in filterFields) {
            if (user[field] !== filterFields[field]) {
                return false
            }
        }
        return true;
    })
}

const usersToFilter = mockObjects;

const filterFields = {
    "country": "Germany",
    "gender": "Male",
}

console.log("\nTask3");
console.log("Filtered users: ", filterUsers(usersToFilter, filterFields));

//
//----------------Task 4----------------
//

function sortUsers(users, sortBy, order="desc") {
    const validFields = ["full_name", "age", "b_day", "country"];

    if (!validFields.includes(sortBy)) {
        return users;
    }

    const sortOrder = order === "desc" ? -1 : 1;

    users.sort((a, b) => {
        switch (sortBy) {
            case 'full_name':
                return a.full_name.localeCompare(b.full_name) * sortOrder;
            case 'age':
                return (a.age - b.age) * sortOrder;
            case 'b_day': 
                return (new Date(a.b_day) - new Date(b.b_day)) * sortOrder;
            case 'country':
                return a.country.localeCompare(b.country) * sortOrder;
            default:
                return a.full_name.localeCompare(b.full_name) * sortOrder;
        }
    });

    return users;
}

const sortBy = "age";
const usersToSort = mockObjects;

console.log("\nTask4");
console.log(`Users sorted by "${sortBy}" field:`, sortUsers(usersToSort, sortBy));

//
//----------------Task 5----------------
//

function findFirst(users, searchBy){
    const validFields = ["name", "note", "age"];
    const fieldToSearch = Object.keys(searchBy)[0];

    if (!validFields.includes(fieldToSearch)) {
        return {};
    }

    const result = users.find((user) => user.fieldToSearch === searchBy.fieldToSearch);

    if (result === undefined){
        return {};
    }

    return result;
}

const usersToSearchIn = mockObjects;

const searchBy = {
    "age": 65
}

console.log("\nTask5");
console.log(`Find user with "${Object.keys(searchBy)[0]} = ${Object.values(searchBy)[0]}": `);
console.log(findFirst(usersToSearchIn, searchBy));