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

console.log("formated objects: ");
console.log(formatObjects([randomUserMock, additionalUsers, randomUserMock]));

//
//----------------Task 2----------------
//

