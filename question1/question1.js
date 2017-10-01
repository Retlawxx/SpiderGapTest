'use strict';

/**
* Question1 is a simple example class for SpiderGap
*/
var Question1 = {
    /**
    * creates deep copy of object
    * Note: Functions are not copied and dates are converted 
    * @param {object} objectToCopy The object to copy
    * @return {object} The deep copy of the object
    */
    deepCopy: function(objectToCopy) {
        if(objectToCopy) {
            return JSON.parse(JSON.stringify(objectToCopy));
        }
        return null;
    }
};

module.exports = Question1;