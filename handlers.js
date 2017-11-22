///<reference path="node_modules/@types/actions-on-google/index.d.ts" />

const constants = require('./constants');

module.exports = {
	welcomeIntent: (app) => {
		console.log('welcomeIntent');

		app.ask('Welcome to B7 farming team medical assitant', NO_INPUTS);
	},	

	unknownIntent: (app) => {
		if (app.getRawInput() === 'quit') {
			
			app.data.restore = null;
			
			app.tell('Goodbye!');
		} else {
			
			app.mappedInput = app.getRawInput();

			app.tell('Log: unknown intent');
		}
	},

	directionsIntent: (app) => {
		const direction = app.getArgument(constants.DIRECTION_ARGUMENT);
		
		console.log('directionsIntent: ' + direction);

		app.tell('Log: direction intent');
	},

	lookIntent: (app) => {
		console.log('lookIntent');
		//app.mappedInput = 'look';
		app.tell('Log: direction intent');
	},

	nameIntent: (app) => {
		app.setContext('awaiting_address', 1, {});
		app.ask(`You say ${app.getRawInput()} and ${app.getArgument('given_name')}. Tell me your address`, NO_INPUTS);		
	},

	intro: (app) => {
		app.setContext('awaiting_name', 1, {});
		app.ask('intro', NO_INPUTS);	
	},

	addressIntent: (app) => {
		app.tell(`You say ${app.getRawInput()}`);		
	},

	educationIntent: (app) => {
		app.tell('Goodbye!');
	},

	dropdownIntent: (app) => {
		app.tell('Goodbye!');
	},

	textboxIntent: (app) => {
		app.tell('Goodbye!');		
	},

	rateIntent: (app) => {
		app.tell('Goodbye!');		
	}
}