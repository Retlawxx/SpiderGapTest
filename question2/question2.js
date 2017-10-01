'use strict';
const fs = require('fs');
const Point = require('./point/point.js');
const Constants = require('./constants.js');

/**
* Question2 is a simple example class for SpiderGap
*/
const Question2 = {
    /**
    * read file and return content
    * @param {string} sourcePath the path to the file to read
    * @return {data} the file data
    */
    readFile: function (sourcePath) {
        return new Promise(function (resolve, reject) {
            fs.readFile(sourcePath, 'utf8', (err, data) => {
                if (err) { reject(err); }
                resolve(JSON.parse(data));
            })
        });
    },

    /**
    * get offices within distance of partner
    * @param {object} partner The partner with offices
    * @param {object} point1  The point from where to start the distance calculation
    * @param {number} distance the distance from the point for distance calculation
    * @return {officesWithinDistance} the offices within distance
    */
    getOfficesWithinDistance: function (partner, point1, distance) {
        const offices = partner.offices;
        let point2, coordinates;
        let officesWithinDistance = [];
        for (let j = 0; j < offices.length; j++) {
            if (offices[j].coordinates) {
                coordinates = this.split(offices[j].coordinates, ',');

                point2 = new Point(coordinates[0], coordinates[1]);

                if (this.calculateDistanceBetweenTwoPoints(point1, point2) <= distance) {
                    officesWithinDistance.push(offices[j]);
                }
            }
        }
        return officesWithinDistance;
    },

    /**
    * get all partners within a given distance
    * @param {object} readFile the read file object for file reading
    * @param {string} partnerFilePath the path to the partner file
    * @param {object} point1  The point from where to start the distance calculation
    * @param {number} distance the distance from the point for distance calculation
    * @return {partnersWithinDistance} the partners within the given distance
    */
    getAllPartnersWithinDistance: function (readFile, partnerFilePath, point1, distance) {
        return new Promise(function (resolve, reject) {
            readFile(partnerFilePath).then(function (partners) {
                let partnersWithinDistance = [];
                let point2, coordinates, offices;
                for (let i = 0; i < partners.length; i++) {
                    offices = partners[i].offices;
                    const officesWithinDistance = this.getOfficesWithinDistance(partners[i], point1, distance);

                    if (officesWithinDistance.length && !partnersWithinDistance.includes(partners[i])) {
                        partners[i].offices = officesWithinDistance;
                        partnersWithinDistance.push(partners[i]);
                    }
                }
                return resolve(partnersWithinDistance);
            }.bind(this));
        }.bind(this));
    },

    /**
    * split a string by a given token
    * @param {string} string the string to split
    * @param {string} splitToken  the token by which the string is split
    * @return {array} the splitted string as array
    */
    split: function (string, splitToken) {
        return string.split(splitToken);
    },

    /**
    * sort partners ascending by organisation name 
    * @param {array} partners the partners array
    * @return {array} the sortert partners array
    */
    sortPartnersAscendingByOrganisationName: function (partners) {
        return partners.sort(function (a, b) {
            // case insensitive
            a = a.organization.toLowerCase();
            b = b.organization.toLowerCase();

            return a < b ? -1 : a > b ? 1 : 0;
        });
    },

    /**
    * calculate distance between two points
    * @param {object} point1 the starting point
    * @param {object} point2 the end point
    * @return {number} the distance between point1 and point2
    */
    calculateDistanceBetweenTwoPoints: function (point1, point2) {
        const point1Latitude = this.convertDegreeToRadian(point1.latitude);
        const point1Longitude = this.convertDegreeToRadian(point1.longitude);
        const point2Latitude = this.convertDegreeToRadian(point2.latitude);
        const point2Longitude = this.convertDegreeToRadian(point2.longitude);

        const sin1 = Math.sin(point1Latitude);
        const sin2 = Math.sin(point2Latitude);
        const cos1 = Math.cos(point1Latitude);
        const cos2 = Math.cos(point2Latitude);
        const cos3 = Math.cos((point2Longitude - point1Longitude));

        const inner = sin1 * sin2 +
            cos1 * cos2 * cos3;

        const angle = Math.acos(inner);

        return Constants.WORLD_CIRCUMFERENCE * (this.convertRadianToDegree(angle) / Constants.FULL_CIRCLE_ANGLE);
    },

    /**
    * convert degree to radian
    * @param {number} degree number value
    * @return {number} radian number value
    */
    convertDegreeToRadian: function (degree) {
        return degree * (Math.PI / Constants.HALF_CIRCLE_ANGLE);
    },

    /**
    * convert radian to degree
    * @param {number}  radian number value
    * @return {number} degree number value
    */
    convertRadianToDegree: function (radian) {
        return radian * (Constants.HALF_CIRCLE_ANGLE / Math.PI);
    },

    /**
    * get all partners within given distance as html for output
    * @param {object}  locationPoint the point from where to start the distance calculation
    * @param {number}  distance the distance from the point for distance calculation
    * @param {string}  partnersFilePath the path to the partners file
    * @return {string} output as html
    */
    getAllPartnersWithinDistanceHTMLOutput: function (locationPoint, distance, partnersFilePath) {
        return new Promise(function (resolve, reject) {
            this.getAllPartnersWithinDistance(this.readFile, partnersFilePath, locationPoint, distance).then(function (partners) {
                let partnersWithinDistance = this.sortPartnersAscendingByOrganisationName(partners);

                let output = [];
                output.push('<h1>Partners within: </h1>');
                output.push(distance);
                output.push(' km');

                for (let i = 0; i < partnersWithinDistance.length; i++) {
                    output.push('<h2>Partner:</h2>');
                    output.push(partnersWithinDistance[i].organization);
                    const offices = partnersWithinDistance[i].offices;
                    for (let j = 0; j < offices.length; j++) {
                        output.push('<h3>Offices:</h3>');
                        output.push('<h4>Location:</h4>');
                        output.push(offices[i].location);
                        output.push('<h4>Address:</h4>');
                        output.push(offices[i].address);
                    }
                }
                resolve(output.join(''));
            }.bind(this));
        }.bind(this));
    }

};

module.exports = Question2;