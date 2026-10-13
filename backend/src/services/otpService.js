const otpGenerator = require("otp-generator");

function generateOTP() {

    return otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
    });

}

module.exports = {
    generateOTP
};