"use strict";

const isNumberRegex = new RegExp("^[0-9]{1,10}$");

const randomValidators = {
    minIsValid(min) {
        if (!isNumberRegex.test(min)) {
            return "Values must be between 1 and 10 characters and must be numbers!";
        }
    },
    maxIsValid(max) {
        if (!isNumberRegex.test(max)) {
            return "Values must be between 1 and 10 characters and must be numbers!";
        }
    },
    minIsLowerThanMax(min, max) {
        if (min >= max) {
            return "Values minimum, must be less than maximum";
        }
    },
};

module.exports = randomValidators;
