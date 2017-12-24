"use strict";

//Variables
var Alexa = require('alexa-sdk');
const info_box = require('./planetBox.js');

var SKILL_NAME = "Planet Mania";
var APP_ID = "";

var GREET = 'I can help you with some exiting information about the planets' +
 'Here are some planets, SUN, MOON, EARTH, ';

//List of compliments
var COMPLIMENT_LIST = [
    "Damn son, you're looking mighty fine today!",
    "Wow! You made an Alexa skill. You're smarter than I thought!",
    "If you were a food, you'd be an endless supply of CheeseCake"
];

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
} 

var handlers = {
    'LaunchRequest': function(){
        this.emit('GreetUser');
    },
    'GreetUserIntent': function() {
        this.emit('GreetUser');
    },
    'GreetUser': function(){
        var complimentIndex = Math.floor(Math.random() * COMPLIMENT_LIST.length);
        var randomCompliment = COMPLIMENT_LIST[complimentIndex];

        //Output
        var speechOutput = GREET;
        this.emit(":tellWithCard", speechOutput, SKILL_NAME, GREET);
    },
    'GetPlanetInfoIntent': function(){
        
        const itemSlot = this.event.request.intent.slots.PLANETNAME;
        let itemName, infoFound;
        if (itemSlot && itemSlot.value) {
            itemName = itemSlot.value.toLowerCase();
        }

        if ( info_box[itemName] ) {
            infoFound = info_box[itemName];
        } else {
            infoFound = info_box['default'];
        }
        
        this.attributes.speechOutput = infoFound;
        this.attributes.repromptSpeech = 'Hope the information was helpful !!!';

        this.response.speak(this.attributes.speechOutput).listen(this.attributes.repromptSpeech);
        this.emit(':responseReady');
        
    },
    'AMAZON.HelpIntent': function(){
        var speechOutput = "You can say tell me about the sun or any other planet name or you can say exit..";
        var reprompt = "What can I help you with ?";
        this.emit(":ask", speechOutput, reprompt);
    },
    'AMAZON.StopIntent': function(){
        this.emit(":tell", "Good Bye!");
    },
    'AMAZON.CancelIntent': function(){
        this.emit(":tell", "Good Bye!");
    }
}