var admin = require("firebase-admin");

var serviceAccount = require("./service_key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://lupa-cd0e3.firebaseio.com"
});

const firestore = admin.firestore();
const path = require("path");
const fs = require("fs");
const directoryPath = path.join(__dirname, "files");

fs.readdir(directoryPath, function(err, files) {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  files.forEach(function(file) {
    console.log(file);


    if (!file.endsWith('.json')) {
     return;
    }

    var lastDotIndex = file.lastIndexOf(".");
    var menu = require("./files/" + file);
    let index = 0;


    menu.forEach(function(obj) {
      let documentName = obj.workout_name.toString();

      obj.prime_mover = JSON.stringify(obj.prime_mover.toString());
      if (obj.prime_mover == "") {
        obj.prime_mover = []
      } else {
        obj.prime_mover = obj.prime_mover.replace("\"[", "");
        obj.prime_mover = obj.prime_mover.replace("]\"", "");
        obj.prime_mover = obj.prime_mover.split(',')
      }

      obj.assisted_mover = JSON.stringify(obj.assisted_mover.toString());
      if (obj.assisted_mover == "") {
        obj.assisted_mover = []
      } else {
        obj.assisted_mover= obj.assisted_mover.replace("\"[", "");
        obj.assisted_mover = obj.assisted_mover.replace("]\"", "");
        obj.assisted_mover= obj.assisted_mover.split(',')
      }


      obj.variant = JSON.stringify(obj.variant.toString());
      if (obj.variant == "") {
        obj.variant = []
      } else {
        obj.variant = obj.variant.replace("\"[", "");
        obj.variant  = obj.variant.replace("]\"", "");
        obj.variant  = obj.variant.split(',')
      }

      obj.required_equipment = JSON.stringify(obj.required_equipment.toString());
      if (obj.required_equipment == "") {
        obj.required_equipment = []
      } else {
        obj.required_equipment = obj.required_equipment.replace("\"[", "");
        obj.required_equipment = obj.required_equipment.replace("]\"", "");
        obj.required_equipment = obj.required_equipment.split(',')
      }
  
      console.log(obj.prime_mover);
      firestore
        .collection('exercises')
        .doc(index.toString())
        .set(obj)
        .then(function(docRef) {
          console.log("Document written");
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
        index++;
    });
  });
});
