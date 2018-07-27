"use strict";

// Built using outdate node version

//Some Packages
var Alexa = require('alexa-sdk');
const info_box = require('./planetBox.js');

// Skill Info
var SKILL_NAME = "Planet Mania";
var APP_ID = "";

// Welcome Message | Default prompt
var GREET = 'I can help you with some useful information about the planets. ' +
 'Here are some planets, SUN, MOON, MERCURY, VENUS, EARTH, MARS, JUPITER, SATURN, URANUS, NEPTUNE AND PLUTO';

// Setup the env. Register the intents
exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
} 

//Handling intents | Default pack
var handlers = {
    // Default greet
    'LaunchRequest': function(){
        this.emit('GreetUser');
    },
    // Just in case 
    'GreetUserIntent': function() {
        this.emit('GreetUser');
    },
    'GreetUser': function(){
        //Output
        var speechOutput = GREET;
        this.emit(":ask", speechOutput, GREET);
    },
    // Planet Info
    'GetPlanetInfoIntent': function(){
        // Carry the input from the the user
        const itemSlot = this.event.request.intent.slots.PLANETNAME;
        let itemName, infoFound;
        // LowerCase 
        if (itemSlot && itemSlot.value) {
            itemName = itemSlot.value.toLowerCase();
        }
        
        // Do I have a record ?
        if ( info_box[itemName] ) {
            infoFound = info_box[itemName];
        } else {
            infoFound = info_box['default'];
        }
        
        let commonConclude = '. Do you wish to get information of any other planet ?';
        
        this.attributes.speechOutput = infoFound + commonConclude;
        this.attributes.repromptSpeech = 'Hope the information was useful ? Say Stop to Exit!';
        
        // Alright!!! Shoot the information you have
        this.response.speak(this.attributes.speechOutput).listen(this.attributes.repromptSpeech);
        this.emit(':responseReady');
        
    },
    // Yes. Repeat the greeting.
    'AMAZON.YesIntent': function() {
        this.emit('GreetUser');
    },
    // No means No
    'AMAZON.NoIntent': function() {
        this.response.speak('Ok, see you next time!');
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function(){
        // Help me!!!!
        var speechOutput = "You can say tell me about the sun or any other planet name or you can say stop instead.";
        var reprompt = "What can I help you with ?";
        this.emit(":ask", speechOutput, reprompt);
    },
    // Stop Me
    'AMAZON.StopIntent': function(){
        this.emit(":tell", "Good Bye!");
    },
    // Cancel Me
    'AMAZON.CancelIntent': function(){
        this.emit(":tell", "Good Bye!");
    }
}
