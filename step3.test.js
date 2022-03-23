const Promise = require("./Promise");
new Promise((resolve, reject) => {
  resolve(100);
})
  .then((data) => data)
  .then((data) => console.log(data));
