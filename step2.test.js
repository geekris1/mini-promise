const Promise = require("./Promise");
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(100);
  });
}).then((data) => console.log(data));
