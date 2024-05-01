
export async function getMockUserData() {
    let mockData = {};
    try {
        const data = await fetch('./assets/config/mock_users.json');
        mockData = await data.json();
    } catch (error) {
        console.error("Error reading mock user data: ", error);
    }

    console.log("Mock data: ", mockData);
    return mockData;
}

export function addRequiredFields(objectArray) {
    const requiredFields = ["full_name", "gender", "note", "state", "city", "country"];

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
        id++;
        object.id = id;
        object.favourite = new Boolean(false);
        const randomIndex = Math.floor(Math.random() * courses.length);
        object.course = courses[randomIndex];
        object.bg_color = "#f9f5f9";
    });

    return objects;
}

export function userIsValid(user) {
    const requiredFields = ["full_name", "gender", "note", "state", "city", "country"];
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phoneRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

    for (let field of requiredFields) {
        if (typeof user[field] !== 'string' || 
        user[field].charAt(0) !== user[field].charAt(0).toUpperCase()) {
            return false;
        }
    }

    if (typeof user.age !== "number") {
        return false;
    }

    if (!phoneRegex.test(user.phone)){
        return false
    }

    if (!emailRegex.test(user.email)) {
        return false;
    }
    return true
}