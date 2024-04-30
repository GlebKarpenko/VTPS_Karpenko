const randomUserMock = {
    "gender": "male",
    "title": "Mr",
    "full_name": "Norbert Weishaupt",
    "city": "Rhön-Grabfeld",
    "state": "Mecklenburg-Vorpommern",
    "country": "Germany",
    "postcode": 52640,
    "coordinates": { "latitude": "-42.1817", "longitude": "-152.1685" },
    "timezone": { "offset": "+9:30", "description": "Adelaide, Darwin" },
    "email": "norbert.weishaupt@example.com",
    "b_date": "1956-12-23T19:09:19.602Z",
    "age": 65,
    "phone": "0079-8291509",
    "picture_large": "https://randomuser.me/api/portraits/men/28.jpg",
    "picture_thumbnail": "https://randomuser.me/api/portraits/thumb/men/28.jpg"
}

const additionalUsers = {
    "gender": "male",
    "title": "Mr",
    "full_name": "Norbert Weishaupt",
    "city": "Rhön-Grabfeld",
    "state": "Mecklenburg-Vorpommern",
    "country": "Germany",
    "postcode": 52640,
    "coordinates": { "latitude": "-42.1817", "longitude": "-152.1685" },
    "timezone": { "offset": "+9:30", "description": "Adelaide, Darwin" },
    "email": "norbert.weishaupt@example.com",
    "b_date": "1956-12-23T19:09:19.602Z",
    "age": 65,
    "phone": "0079-8291509",
    "picture_large": "https://randomuser.me/api/portraits/men/28.jpg",
    "picture_thumbnail": "https://randomuser.me/api/portraits/thumb/men/28.jpg",
    "education": "Ph.D. in Computer Science",
    "hobbies": ["Reading", "Photography", "Hiking"]
}

const randomUserMock2 = {
    "gender": "male",
    "full_name": "Richard Roussel",
    "city": "Mettmenstetten",
    "state": "Aargau",
    "country": "Switzerland",
    "postcode": 3918,
    "coordinates": {
    "latitude": "-63.6075",
    "longitude": "-97.4008"
    },
    "timezone": {
    "offset": "-7:00",
    "description": "Mountain Time (US & Canada)"
    },
    "email": "richard.roussel@example.com",
    "login": {
    "uuid": "de3be804-d0e7-44a3-b815-b93b53bc4579",
    "username": "beautifulgoose727",
    "password": "lalakers",
    "salt": "Zd3BpQn8",
    "md5": "bb751a56fc1b0f14e2aeb51cccb1e88b",
    "sha1": "cdd562fea4c1e78098410bc6c1c74c639c944ddf",
    "sha256": "122ecd01d4e73f6f383772468f716a095962a1dea2ecc1609976c2065b270592"
    },
    "dob": "1979-09-11T22:33:39.696Z",
    "age": 44,
    "registered": {
    "date": "2006-10-15T19:42:25.460Z",
    "age": 17
    },
    "phone": "075 772 34 61",
    "cell": "075 637 97 85",
    "id": {
    "name": "AVS",
    "value": "756.9716.2620.37"
    },
    "picture": {
    "large": "https://randomuser.me/api/portraits/men/70.jpg",
    "medium": "https://randomuser.me/api/portraits/med/men/70.jpg",
    "thumbnail": "https://randomuser.me/api/portraits/thumb/men/70.jpg"
    },
    "nat": "CH"
}

//
//----------------Task 1----------------
//

function formatObjects(objects = []){
    const courses = ["Mathematics", "Physics", "English", "Computer Science", "Dancing", "Chess", "Biology", "Chemistry", "Law", "Art", "Medicine", "Statistics"];
    let id = 0;
    
    objects.forEach(object => {
        id++;
        object.id = id;
        object.favourite = new Boolean(false);
        const randomIndex = Math.floor(Math.random() * courses.length);
        object.course = courses[randomIndex];
        bg_color = "#f9f5f9";
    });

    objects.push({ ...randomUserMock, ...additionalUsers});
    return objects;
}

console.log("\nTask1");
console.log("formated objects: ");
console.log(formatObjects([randomUserMock, additionalUsers, randomUserMock]));

//
//----------------Task 2----------------
//

function userIsValid(user) {
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

console.log("\nTask2");
console.log(`User with name ${randomUserMock.full_name} is valid: ${userIsValid(randomUserMock)}`);

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

const usersToFilter = [
    randomUserMock,
    { ...randomUserMock, favourite: true }
]

const filterFields = {
    "country": "Germany",
    "age": 65,
    "gender": "male",
    "favourite": true
}

console.log("\nTask3");
console.log("Filtered users: ", filterUsers(usersToFilter, filterFields));

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
const usersToSort = [
    randomUserMock,
    additionalUsers,
    randomUserMock2
];

console.log("\nTask4");
console.log(`Users sorted by "${sortBy}" field:`, sortUsers(usersToSort, sortBy, order='asc'));

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

const usersToSearchIn = [
    randomUserMock,
    additionalUsers,
    randomUserMock2
]

const searchBy = {
    "age": 65
}

console.log("\nTask5");
console.log(`Find user with "${Object.keys(searchBy)[0]} = ${Object.values(searchBy)[0]}": `);
console.log(findFirst(usersToSearchIn, searchBy));