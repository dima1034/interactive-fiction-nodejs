// Copyright 2017, SoftServe, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

process.env.DEBUG = 'actions-on-google:*';
const { DialogflowApp } = require('actions-on-google');
const express = require('express');
const bodyParser = require('body-parser');

const cmd = false;
const inputs = [];

// [START YourAction]

const questions = [
	"Tell me your fullname",
	"Tell me your postal zip/code",
	"Country",
	"City",
	"Birthday",
	"Street Address",
	"University",
	"Degree",
	"Field of study",
];

const expressApp = express();
expressApp.set('port', (process.env.PORT || 8080));
expressApp.use(bodyParser.json({ type: 'application/json' }));

expressApp.post('/', (request, response) => {
	const app = new DialogflowApp({ request: request, response: response });
	
	console.log('Request headers: ' + JSON.stringify(request.headers));
	console.log('Request body: ' + JSON.stringify(request.body));

	const WELCOME_INTENT = 'input.welcome';
	const UNKNOWN_INTENT = 'input.unknown';
	const DIRECTION_INTENT = 'input.directions';
	const DIRECTION_ARGUMENT = 'Directions';
	const LOOK_INTENT = 'input.look';
	const UserProvidesName_INTENT = 'input.pre_userprovidesname';

	const welcomeIntent = (app) => {
		console.log('welcomeIntent');
		app.tell('Log: welcome intent');
	};

	const userProvidesNameIntent = (app) => {
		console.log('nameIntent');
		app.tell('Log: name intent');
	};

	const unknownIntent = (app) => {
		console.log('unknownIntent: ' + app.getRawInput());
		if (app.getRawInput() === 'quit') {
			app.data.restore = null;
			app.tell('Goodbye!');
		} else {
			app.mappedInput = app.getRawInput();
			app.tell('Log: unknown intent');
		}
	};

	const directionsIntent = (app) => {
		const direction = app.getArgument(DIRECTION_ARGUMENT);
		console.log('directionsIntent: ' + direction);
		app.mappedInput = 'go ' + direction;
		app.tell('Log: direction intent');
	};

	const lookIntent = (app) => {
		console.log('lookIntent');
		app.mappedInput = 'look';
		app.tell('Log: direction intent');
	};

	const actionMap = new Map();
	actionMap.set(WELCOME_INTENT, welcomeIntent);
	actionMap.set(UNKNOWN_INTENT, unknownIntent);
	actionMap.set(DIRECTION_INTENT, directionsIntent);
	actionMap.set(LOOK_INTENT, lookIntent);
	actionMap.set(UserProvidesName_INTENT, userProvidesNameIntent);

	const url = request.query.url;
	if (url) {
		loadData(url, (data) => {
			console.log('custom data: ' + url);
			app.handleRequest(actionMap);
		}, true);
	} else {
		app.handleRequest(actionMap);
	}
});
// [END YourAction]

if (module === require.main) {
	// [START server]
	// Start the server
	const server = expressApp.listen(process.env.PORT || 8080, () => {
		const port = server.address().port;
		console.log('App listening on port %s', port);
	});
	// [END server]
}

module.exports = expressApp;
