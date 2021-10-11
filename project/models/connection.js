const { DateTime } = require("luxon");
const { v4: uuidv4 } = require("uuid");

const connections = [
  {
    connection_id: 1,
    connection_topic: "Web Developement workshop",
    connection_name: "Web Developer workshop",
    details:
      "This Event is for all those who are new to web Developement and want to pusue a new Career in web developemnt",
    host: "Hosted by queen city webdev",
    date: "2021-10-16",
    start_time: "9:00",
    end_time: "12:00",
    location: "Mariot conference center",
    image: "/images/connection_image.png",
  },
  {
    connection_id: 2,
    connection_topic: "Web Developement workshop",
    connection_name: "React js Developer workshop",
    details: "This Event is an introcuctroy course for React devlopment",
    host: "Hosted by queen city webdev",
    date: "2021-10-16",
    start_time: "1:00",
    end_time: "4:00",
    location: "Mariot conference center",
    image: "/images/connection_image.png",
  },
  {
    connection_id: 3,
    connection_topic: "Web Developement workshop",
    connection_name: "MERN Stack conference",
    details:
      "This Event is a conference to discuss latest advancements in MERN stack",
    host: "Hosted by Unc charlotte CCI",
    date: "2021-10-17",
    start_time: "9:00",
    end_time: "12:00",
    location: "uncc student union",
    image: "/images/connection_image.png",
  },
  {
    connection_id: 4,
    connection_topic: "Mobile Developement Hackthon",
    connection_name: "Andrioid Development workshop",
    details:
      "In this workshop you will be a learn how to develop an android app and publish in android studio",
    host: "Hosted by Codecademy",
    date: "2021-10-17",
    start_time: "9:00",
    end_time: "12:00",
    location: "Mariot conference center",
    image: "/images/connection_image.png",
  },
  {
    connection_id: 5,
    connection_topic: "Mobile Developement Hackthon",
    connection_name: "IOS Developement workshop",
    details:
      "In this workshop you will be a learn how to develop an ios app and publish in app store",
    host: "Hosted by Xcode developers",
    date: "2021-10-17",
    start_time: "1:00",
    end_time: "4:00",
    location: "Mariot conference center",
    image: "/images/connection_image.png",
  },
  {
    connection_id: 6,
    connection_topic: "Mobile Developement Hackthon",
    connection_name: "Cross application developement using flutter",
    details:
      "This a workshop which outlines cross application development using flutter",
    host: "Hosted by Flutter",
    date: "2021-10-17",
    start_time: "5:00",
    end_time: "7:00",
    location: "Mariot conference center",
    image: "/images/connection_image.png",
  },
];
//get all connections
exports.getConnections = () => {
  return connections;
};

//get connection topics
exports.getConnectionTopics = () => {
  let names = undefined;
  connections.forEach((element) => {
    let ConnectionName = element.connection_topic;
    if (names === undefined) {
      names = [];
      names.push(ConnectionName);
    } else if (names.findIndex((name) => name === ConnectionName) == -1) {
      names.push(ConnectionName);
    }
  });
  return names;
};

//find_connection by id
exports.findById = (id) => {
  return connections.find((connection) => conection.id === id);
};

//create new connection
exports.save = (connection) => {
  conection.id = uuidv4();
  connections.push(connection);
};

//update connection by id
exports.updateById = (id, newConnection) => {
  let connections = connections.find((connection) => connection.id === id);
  if (connection) {
    connections.connection_name = newConnection.connection_name;
    connections.Date = newEvent.Date;
    connections.start_time = newEvent.start_time;
    connections.end_time = newEvent.end_time;
    connections.location = newEvent.location;
    connections.image = newEvent.image;
    connections.Host = newEvent.Host;
    connections.Description = newEvent.Description;
    return true;
  } else {
    return false;
  }
};

//delete connection by id
exports.deletebyId = (id) => {
  let index = connections.findIndex((connection) => connection.id === id);
  if (index !== -1) {
    connections.splice(index, 1);
    return true;
  } else {
    return false;
  }
};
