const { DateTime } = require("luxon");
const { v4: uuidv4 } = require("uuid");

const hackathons = [
  {
    id: uuidv4(),
    topic: "Web Development workshop",
    name: "Node Js Workshop",
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
    topic: "Mobile Development hackathon",
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
    topic: "Mobile Development hackathon",
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
    topic: "Mobile Development hackathon",
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
//get all hackathons
exports.getHackathons = () => {
  return hackathons;
};

//get hackathon topics
exports.getHackathonTopics = () => {
  let names = undefined;
  hackathons.forEach((element) => {
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

//find_hackathon by id
exports.findById = (id) => {
  return hackathons.find((hackathon) => hackathon.id === id);
};

//create new hackathon
exports.save = (hackathon) => {
  hackathon.id = uuidv4();
  hackathons.push(hackathon);
};

//update hackathon by id
exports.updateById = (id, newhackathon) => {
  let hackathon = hackathons.find((hackathon) => hackathon.id === id);
  if (hackathon) {
    hackathon.name = newhackathon.name;
    hackathon.topic = newhackathon.topic;
    hackathon.date = newhackathon.date;
    hackathon.start_time = newhackathon.start_time;
    hackathon.end_time = newhackathon.end_time;
    hackathon.location = newhackathon.location;
    hackathon.image = newhackathon.image;
    hackathon.host = newhackathon.host;
    hackathon.details = newhackathon.details;
    return true;
  } else {
    return false;
  }
};

//delete hackathon by id
exports.deleteById = (id) => {
  let index = hackathons.findIndex((hackathon) => hackathon.id === id);
  if (index !== -1) {
    hackathons.splice(index, 1);
    return true;
  } else {
    return false;
  }
};
