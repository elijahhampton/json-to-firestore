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
    console.log('Now working with file: ' + file);

    if (!file.endsWith('.json')) {
     return;
    }

    var menu = require("./files/" + file);


    menu.forEach(function(obj) {
      //operations
    });
  });
});
