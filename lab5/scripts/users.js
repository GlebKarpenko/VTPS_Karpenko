
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
            object.bg_color ??= "#f9f5f9";
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
            if (!fieldIsFiltered(user, field, filterFields)) {
                return false;
            }
        }
        return true;
    })
}

export function filterMatchingUsers(users, filterFields) {
    return users.filter(user => {
        for (let field in filterFields) {
            if (filterFields[field] && !fieldIsMatching(user, field, filterFields)) {
                return false;
            }
        }
        return true;
    })
}

function fieldIsMatching(user, field, filterFields) {
    const userValue = String(user[field]).toLowerCase();
    const filterValue = String(filterFields[field]).toLowerCase();
    return userValue.includes(filterValue);
}

function fieldIsFiltered(user, field, filterFields) {
    if (field === 'picture') {
        if (user['picture']) {
            return true;
        }
        else {
            return false;
        }
    }

    if (field === 'dob') {
        if (user["dob"]["age"] >= filterFields["dob"]["age"]["min"]
        && user["dob"]["age"] <= filterFields["dob"]["age"]["max"]) {
            return true;
        }
        else {
            return false;
        }
    }
    
    if (user[field] !== filterFields[field]) {
        return false
    }

    return true;
}

export function sortUsers(users, sortBy, order="desc") {
    const validFields = ["full_name", "course", "gender", "age", "b_day", "country"];

    if (!validFields.includes(sortBy)) {
        return users;
    }

    const sortOrder = order === "desc" ? -1 : 1;

    users.sort((a, b) => {
        switch (sortBy) {
            case 'full_name':
                return a.full_name.localeCompare(b.full_name) * sortOrder;
            case 'course':
                return a.course.localeCompare(b.course) * sortOrder;
            case 'gender':
                return a.gender.localeCompare(b.gender) * sortOrder;
            case 'age':
                return (a.dob.age - b.dob.age) * sortOrder;
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