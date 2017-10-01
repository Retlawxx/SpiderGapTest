'use strict';
var expect = require('chai').expect;
var Question1 = require('./question1.js');

describe('Question1', function() {
    it('should exist', function() {
        var Question1 = require('./question1.js');
        expect(Question1).to.not.be.undefined;
    });
});

describe('Question1', function() {
    it('should create deep copy of passed object in parameter', function() {
        let objectToCopy =  {
            name: "Paddy", 
            address: 
            {
                town: "Lerum", 
                country: "Sweden"
            }
        };
        
        // modify deepCopy object to see if reference is influenced
        let deepCopy = Question1.deepCopy(objectToCopy);
        objectToCopy.address.town = "New York";

        expect(deepCopy.address.town === objectToCopy.address.town).to.not.be.true;
    });

    it('should create deep copy of passed object in parameter', function() {
        let objectToCopy =  {
            name: {
                complete: {
                    firstname: "Walter",
                    lastname: "Laurito"
                },
                nickname: "Walt"
            },
            address: 
            {
                town: "Karlsruhe", 
                country: "Germany"
            }
        };
        
        // modify deepCopy object to see if reference is influenced
        let deepCopy = Question1.deepCopy(objectToCopy);
        objectToCopy.name.complete.firstname = "John";

        expect(deepCopy.name.complete.firstname === objectToCopy.name.complete.firstname).to.not.be.true;
    });

    it('should return null for no parameter', function() {
        var deepCopy;

        deepCopy = Question1.deepCopy(); // no parameter

        expect(deepCopy).to.be.null;
    });

    it('should return null for null parameter', function() {
        var deepCopy;

        deepCopy = Question1.deepCopy(null);

        expect(deepCopy).to.be.null;
    });

    it('should return null for NaN parameter', function() {
        var deepCopy;

        deepCopy = Question1.deepCopy(NaN);

        expect(deepCopy).to.be.null;
    });

    it('should return null for undefined parameter', function() {
        var deepCopy;

        deepCopy = Question1.deepCopy(undefined);

        expect(deepCopy).to.be.null;
    });

    it('should return correct number', function() {
        var deepCopy;

        deepCopy = Question1.deepCopy(-1234); // no param

        expect(deepCopy).to.be.eql(-1234);
    });

    it('should return empty array', function() {
        var deepCopy;

        deepCopy = Question1.deepCopy([]); // no param

        expect(deepCopy).to.be.eql([]);
    });

    it('should return correct string', function() {
        var deepCopy;

        deepCopy = Question1.deepCopy('simple string'); // no param

        expect(deepCopy).to.be.eql('simple string');
    });
});