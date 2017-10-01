'use strict';
const expect = require('chai').expect;
const { assert } = require('chai');
const Constants = require('./constants.js');

const Question2 = require('./question2.js');
const Point = require('./point/point.js');
const samplePartnersData = [
    {
        "id": 13,
        "urlName": "gallus-consulting",
        "organization": "Gallus Consulting",
        "customerLocations": "across the UK",
        "willWorkRemotely": true,
        "website": "http://www.gallusconsulting.com/",
        "services": "We're strategy consultants with a difference - we work with organisations and their leaders to take them from strategy to reality. In our work with leaders we often use 360-degree feedback to identify capability gaps, improve self-awareness, and develop strategic and cultural alignment. Our aim is for believe-able leaders to emerge with the drive, capability and cultural fit to take strategy to reality.",
        "offices": [
            {
                "location": "Northampton",
                "address": "Newton House, Northampton Science Park, Moulton Park, Kings Park Road, Northampton, NN3 6LG",
                "coordinates": "52.277409,-0.877935999999977"
            },
            {
                "location": "London",
                "address": "Central London, London, EC3V 3DG",
                "coordinates": "51.515419,-0.141099"
            },
            {
                "location": "Manchester",
                "address": "3 Hardman Square, Spinningfields, Manchester, M3 3EB",
                "coordinates": "53.47990859999999,-2.2510892999999896"
            }
        ]
    },
    {
        "id": 15,
        "urlName": "lincoln-learning",
        "organization": "Lincoln L&D",
        "customerLocations": "across Australasia, SE Asia, Africa and the Middle East",
        "willWorkRemotely": true,
        "website": "http://www.lincolnlearning.com.au/",
        "services": "Lincoln Learning & Development facilitates team performance, leadership development and management coaching programs. We take a practical, real-world perspective and look for actionable steps to bring about change.",
        "offices": [
            {
                "location": "Adelaide",
                "address": "Unley, SA 5061, Australia",
                "coordinates": "-34.95,138.60000000000002"
            }
        ]
    },
    {
        "id": 1,
        "urlName": "balance-at-work",
        "organization": "Balance at Work",
        "customerLocations": "across Australia, Pacific and Oceania",
        "willWorkRemotely": true,
        "website": "http://www.balanceatwork.com.au/",
        "services": "At Balance at Work, we want to help you make work a joy for your employees and you! We specialize in leadership development, talent management and career coaching, and use Spidergap as one of our tools to help employees focus their development and achieve more.",
        "offices": [
            {
                "location": "Sydney, Australia",
                "address": "Suite 1308, 109 Pitt St \nSydney 2000",
                "coordinates": "-33.8934219,151.20404600000006"
            }
        ]
    }];

describe('Question2', function () {
    it('should exist', function () {
        const Question2 = require('./question2.js');
        expect(Question2).to.not.be.undefined;
    });

    it('should take location as latitude and longitude and return corresponding partners within 100km', function (done) {
        const sampleResults = samplePartnersData[0];
        const sampleFileReader = function (sourcePath) {
            const expectedSourcePath = Constants.PARTNERS_FILE_PATH;
            expect(sourcePath).to.equal(expectedSourcePath)
            return Promise.resolve(samplePartnersData);
        };

        Question2.getAllPartnersWithinDistance(sampleFileReader, Constants.PARTNERS_FILE_PATH, new Point(53.47990859999999, -2.2510892999999896), 100)
            .then(function (actual) {
                expect(actual[0].id).to.eql(sampleResults.id);
                done();
            })
            .catch((reason) => {
                done(new Error('rejected promise: (' + reason + ').'));
            });
    });

    it('should take radian and return correct value in degrees', function () {
        const degree = Question2.convertRadianToDegree(1);
        expect(degree).to.eql(57.29577951308232);
    });

    it('should take degrees and return correct value in radian', function () {
        const radian = Question2.convertDegreeToRadian(57.29577951308232);
        expect(radian).to.eql(1);
    });

    it('should calculate and return correct distance', function () {
        // Berlin
        const point1 = {
            latitude: 52.517,
            longitude: 13.40
        };
        // Tokio
        const point2 = {
            latitude: 35.70,
            longitude: 139.767
        }
        const result = Question2.calculateDistanceBetweenTwoPoints(point1, point2);

        expect(result).to.eql(8912.22722282526);
    });

    it('should return correct splitted string array', function () {
        const string = '46.222,29.028';

        const stringArray = Question2.split(string, ',');

        expect(stringArray.length).to.eql(2);
        expect(stringArray[0]).to.eql('46.222');
        expect(stringArray[1]).to.eql('29.028');
    });

    it('should return partner array in correct ascending order', function () {
        const sortedPartners = Question2.sortPartnersAscendingByOrganisationName(samplePartnersData);

        expect(sortedPartners[0].id).to.eql(1);
        expect(sortedPartners[1].id).to.eql(13);
        expect(sortedPartners[2].id).to.eql(15);
    });

});