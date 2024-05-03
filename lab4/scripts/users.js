
export async function getMockUserData() {
    let mockData = {};
    try {
        const data = await fetch('./assets/config/mock_users.json');
        mockData = await data.json();
    } catch (error) {
        console.error("Error reading mock user data: ", error);
    }

    return mockData;
}

export function addRequiredFields(objectArray) {
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

export function formatUserData(objects = []) {
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
            console.error("Could not format this user! Not enough data.", error);
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

export function userIsValid(user) {
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
        console.error(`User with id: ${user.id} is not valid! `, error);
    }
    return false;
}

export function findFirst(users, searchBy){
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

export function filterUsers(users, filterFields) {
    return users.filter(user => {
        for (let field in filterFields) {
            if (user[field] !== filterFields[field]) {
                return false
            }
        }
        return true;
    })
}