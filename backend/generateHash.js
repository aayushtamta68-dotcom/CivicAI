const bcrypt = require("bcrypt");

bcrypt.hash("12345678", 10).then(hash => {
    console.log(hash);
});