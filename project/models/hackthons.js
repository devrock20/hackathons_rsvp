const { DateTime } = require("luxon");
const { v4: uuidv4 } = require("uuid");

const hackthons = [
  {
    id: uuidv4(),
    topic: "Web Development workshop",
    name: "Web Developer workshop",
    details:
      "This Event is for all those who are new to web Developement and want to pusue a new Career in web developemnt",
    host: "Hosted by queen city webdev",
    date: "2021-10-13",
    start_time: "09:00",
    end_time: "12:00",
    location: "Mariot conference center",
    image: "/images/conection_image.png",
  },
  {
    id: uuidv4(),
    topic: "Web Development workshop",
    name: "React js Developer workshop",
    details: "This Event is an introcuctroy course for React devlopment",
    host: "Hosted by queen city webdev",
    date: "2021-10-16",
    start_time: "13:00",
    end_time: "16:00",
    location: "Mariot conference center",
    image: "/images/conection_image.png",
  },
  {
    id: uuidv4(),
    topic: "Web Development workshop",
    name: "MERN Stack conference",
    details:
      "This Event is a conference to discuss latest advancements in MERN stack",
    host: "Hosted by Unc charlotte CCI",
    date: "2021-10-17",
    start_time: "09:00",
    end_time: "12:00",
    location: "UNC Charlotte Popp Martin student union",
    image: "/images/conection_image.png",
  },
  {
    id: uuidv4(),
    topic: "Mobile Development Hackthon",
    name: "Andrioid Development workshop",
    details:
      "In this workshop you will be a learn how to develop an android app and publish in android studio",
    host: "Hosted by Codecademy",
    date: "2021-10-17",
    start_time: "09:00",
    end_time: "12:00",
    location: "Mariot conference center",
    image: "/images/conection_image.png",
  },
  {
    id: uuidv4(),
    topic: "Mobile Development Hackthon",
    name: "IOS development workshop",
    details:
      "In this workshop you will be a learn how to develop an ios app and publish in app store",
    host: "Hosted by Xcode developers",
    date: "2021-10-17",
    start_time: "13:00",
    end_time: "16:00",
    location: "Mariot conference center",
    image: "/images/conection_image.png",
  },
  {
    id: uuidv4(),
    topic: "Mobile Development Hackthon",
    name: "Cross application development using flutter",
    details:
      "This a workshop which outlines cross application development using flutter",
    host: "Hosted by Flutter",
    date: "2021-10-17",
    start_time: "17:00",
    end_time: "19:00",
    location: "UNC Charlotte CHSS Building",
    image: "/images/conection_image.png",
  },
];
//get all hackthons
exports.getHackthons = () => {
  return hackthons;
};

//get hackthon topics
exports.getHackthonTopics = () => {
  let names = undefined;
  hackthons.forEach((element) => {
    let topicName = element.topic;
    if (names === undefined) {
      names = [];
      names.push(topicName);
    } else if (names.findIndex((name) => name === topicName) == -1) {
      names.push(topicName);
    }
  });
  return names;
};

//find_hackthon by id
exports.findById = (id) => {
  return hackthons.find((hackthon) => hackthon.id === id);
};

//create new hackthon
exports.save = (hackthon) => {
  hackthon.id = uuidv4();
  hackthons.push(hackthon);
};

//update hackthon by id
exports.updateById = (id, newhackthon) => {
  let hackthons = hackthons.find((hackthon) => hackthon.id === id);
  if (hackthon) {
    hackthons.name = newhackthon.name;
    hackthons.date = newhackthon.date;
    hackthons.start_time = newhackthon.start_time;
    hackthons.end_time = newhackthon.end_time;
    hackthons.location = newhackthon.location;
    hackthons.image = newhackthon.image;
    hackthons.host = newhackthon.host;
    hackthons.details = newhackthon.details;
    return true;
  } else {
    return false;
  }
};

//delete hackthon by id
exports.deletebyId = (id) => {
  let index = hackthons.findIndex((hackthon) => hackthon.id === id);
  if (index !== -1) {
    hackthons.splice(index, 1);
    return true;
  } else {
    return false;
  }
};
