const Promise = require("./Promise");
new Promise((resolve, reject) => {
  resolve(100);
})
  .then((data) => new Promise((resolve, reject) => resolve(data)))
  .then((data) => console.log(data));
