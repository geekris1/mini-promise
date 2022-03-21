const Promise = require("./Promise");
new Promise((reject, resolve) => {
  reject(100);
}).then((data) => console.log(data));
