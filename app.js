///<reference path="node_modules/@types/actions-on-google/index.d.ts" />

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
const constants = require('./constants');
const handlers = require('./handlers');

const cmd = false;
const inputs = [];

// [START YourAction]

const expressApp = express();
expressApp.set('port', (process.env.PORT || 8080));
expressApp.use(bodyParser.json({ type: 'application/json' }));

expressApp.post('/', (request, response) => {
	const app = new DialogflowApp({ request: request, response: response });
	
	console.log('Request headers: ' + JSON.stringify(request.headers));
	console.log('Request body: ' + JSON.stringify(request.body));

	const actionMap = new Map();
	actionMap.set(constants.WELCOME_INTENT, handlers.welcomeIntent.bind(null, app));
	actionMap.set(constants.UNKNOWN_INTENT, handlers.unknownIntent.bind(null, app));
	actionMap.set(constants.DIRECTION_INTENT, handlers.directionsIntent.bind(null, app));
	actionMap.set(constants.LOOK_INTENT, handlers.lookIntent.bind(null, app));
	//custom
	actionMap.set(constants.NAME_INTENT, handlers.nameIntent.bind(null, app));
	actionMap.set(constants.EDUCATION_INTENT, handlers.educationIntent.bind(null, app));
	actionMap.set(constants.DROPDOWN_INTENT, handlers.dropdownIntent.bind(null, app));
	actionMap.set(constants.RATE_INTENT, handlers.rateIntent.bind(null, app));
	actionMap.set(constants.ADDRESS_INTENT, handlers.addressIntent.bind(null, app));
	actionMap.set(constants.TEXTBOX_INTENT, handlers.textboxIntent.bind(null, app));
	actionMap.set(constants.INTRO_INTENT, handlers.intro.bind(null, app));

	app.handleRequest(actionMap);	
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
