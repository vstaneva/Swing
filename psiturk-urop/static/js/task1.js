/*
 * Requires:
 *     psiturk.js
 *     utils.js
 */

// Initalize psiturk object
var psiTurk = new PsiTurk(uniqueId, adServerLoc, mode);

var mycondition = condition;  // these two variables are passed by the psiturk server process
var mycounterbalance = counterbalance;  // they tell you which condition you have been assigned to
// they are not used in the stroop code but may be useful to you

// All pages to be loaded
var pages = [
	"instructions/instruct-1.html",
	"instructions/instruct-2.html",
	"instructions/instruct-3.html",
	"instructions/instruct-ready.html",
	"stage.html",
	"postquestionnaire.html"
];

psiTurk.preloadPages(pages);

var instructionPages = [ // add as a list as many pages as you like
	"instructions/instruct-1.html",
	"instructions/instruct-2.html",
	"instructions/instruct-3.html",
	"instructions/instruct-ready.html"
];


/********************
* HTML manipulation
*
* All HTML files in the templates directory are requested 
* from the server when the PsiTurk object is created above. We
* need code to get those pages from the PsiTurk object and 
* insert them into the document.
*
********************/

/********************
* STROOP TEST       *
********************/
//put a KEYWORD here so python can insert the experiment data.
var Experiment = function() {
	var trials = [
		["ITEM", "CONDITION", "SET", "NUM", "FORM TEXT", "PIC URL", "AUDIO URL", "QUESTION", "TYPE", ['ANSWERS']],
		["1", "One", "1", "1", "Answer "No" regardless of the question.", "http://web.mit.edu/suhasv/www/bcs-exp/blogmoose.jpg", "", "Are you paying attention?", "Radio", ['Yes', 'No']],
		["1", "unconstraining_NP2", "1", "1", "The editor saw the reporter.", "", "", "Did the editor see someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["1", "unconstraining_RCNP", "1", "1", "The editor saw the senator.", "", "", "Did the editor see someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["1", "constraining_NP2", "1", "1", "The editor hired the reporter.", "", "", "Did the editor see someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["1", "constraining_RCNP", "1", "1", "The editor hired the senator.", "", "", "Did the editor see someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["2", "unconstraining_NP2", "1", "1", "The accountant contacted the executive.", "", "", "Did the accountant contact someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["2", "unconstraining_RCNP", "1", "1", "The accountant contacted the secretary.", "", "", "Did the accountant contact someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["2", "constraining_NP2", "1", "1", "The accountant wrote a report for the executive.", "", "", "Did the accountant contact someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["2", "constraining_RCNP", "1", "1", "The accountant wrote a report for the secretary.", "", "", "Did the accountant contact someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["3", "constraining_RCNP", "1", "1", "The leading lady shared a scene with the comedian.", "", "", "Did the leading lady forget someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["3", "constraining_RCNP", "2", "1", "The leading lady shared a scene with the comedian.", "", "", "Enter a number between 1 and 100.", "Free", ['']],
		["3", "constraining_RCNP", "2", "2", "The leading lady shared a scene with the comedian.", "", "", "Write a short story for us.", "Free", ['']],
		["3", "constraining_NP2", "1", "1", "The leading lady shared a scene with the comedian.", "", "", "Did the leading lady forget someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["3", "constraining_NP2", "2", "1", "The leading lady shared a scene with the comedian.", "", "", "Enter a number between 1 and 100.", "Free", ['']],
		["3", "constraining_NP2", "2", "2", "The leading lady shared a scene with the comedian.", "", "", "Write a short story for us.", "Free", ['']],
		["3", "unconstraining_RCNP", "1", "1", "The leading lady shared a scene with the comedian.", "", "", "Did the leading lady forget someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["3", "unconstraining_RCNP", "2", "1", "The leading lady shared a scene with the comedian.", "", "", "Enter a number between 1 and 100.", "Free", ['']],
		["3", "unconstraining_RCNP", "2", "2", "The leading lady shared a scene with the comedian.", "", "", "Write a short story for us.", "Free", ['']],
		["3", "unconstraining_NP2", "1", "1", "The leading lady shared a scene with the comedian.", "", "", "Did the leading lady forget someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["3", "unconstraining_NP2", "2", "1", "The leading lady shared a scene with the comedian.", "", "", "Enter a number between 1 and 100.", "Free", ['']],
		["3", "unconstraining_NP2", "2", "2", "The leading lady shared a scene with the comedian.", "", "", "Write a short story for us.", "Free", ['']],
		["1", "A", "1", "1", "The blue ball was in the room.", "", "", "What color was the mattress?", "Radio", ['Red', 'Blue', 'Unclear']],
		["1", "B", "1", "1", "The blue mattress was in the room.", "", "", "What color was the mattress?", "Radio", ['Red', 'Blue', 'Unclear']],
		["2", "A", "1", "1", "Johnny had a baseball glove.", "", "", "Did Johnny have a ball?", "Radio", ['Yes', 'No', 'Maybe']],
		["2", "B", "1", "1", "Johnny had a baseball.", "", "", "Did Johnny have a ball?", "Radio", ['Yes', 'No', 'Maybe']],
		["3", "A", "1", "1", "There are 7 days in a week.", "", "", "How many days are in a month?", "Radio", ['7', '30', '365']],
		["3", "B", "1", "1", "There are 7 days in a week.", "", "", "How many days are in a week?", "Radio", ['7', '30', '365']],
	];
		["ITEM", "CONDITION", "SET", "NUM", "FORM TEXT", "PIC URL", "AUDIO URL", "QUESTION", "TYPE", ['ANSWERS']],
		["1", "One", "1", "1", "Answer "No" regardless of the question.", "http://web.mit.edu/suhasv/www/bcs-exp/blogmoose.jpg", "", "Are you paying attention?", "Radio", ['Yes', 'No']],
		["1", "unconstraining_NP2", "1", "1", "The editor saw the reporter.", "", "", "Did the editor see someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["1", "unconstraining_RCNP", "1", "1", "The editor saw the senator.", "", "", "Did the editor see someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["1", "constraining_NP2", "1", "1", "The editor hired the reporter.", "", "", "Did the editor see someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["1", "constraining_RCNP", "1", "1", "The editor hired the senator.", "", "", "Did the editor see someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["2", "unconstraining_NP2", "1", "1", "The accountant contacted the executive.", "", "", "Did the accountant contact someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["2", "unconstraining_RCNP", "1", "1", "The accountant contacted the secretary.", "", "", "Did the accountant contact someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["2", "constraining_NP2", "1", "1", "The accountant wrote a report for the executive.", "", "", "Did the accountant contact someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["2", "constraining_RCNP", "1", "1", "The accountant wrote a report for the secretary.", "", "", "Did the accountant contact someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["3", "constraining_RCNP", "1", "1", "The leading lady shared a scene with the comedian.", "", "", "Did the leading lady forget someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["3", "constraining_RCNP", "2", "1", "The leading lady shared a scene with the comedian.", "", "", "Enter a number between 1 and 100.", "Free", ['']],
		["3", "constraining_RCNP", "2", "2", "The leading lady shared a scene with the comedian.", "", "", "Write a short story for us.", "Free", ['']],
		["3", "constraining_NP2", "1", "1", "The leading lady shared a scene with the comedian.", "", "", "Did the leading lady forget someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["3", "constraining_NP2", "2", "1", "The leading lady shared a scene with the comedian.", "", "", "Enter a number between 1 and 100.", "Free", ['']],
		["3", "constraining_NP2", "2", "2", "The leading lady shared a scene with the comedian.", "", "", "Write a short story for us.", "Free", ['']],
		["3", "unconstraining_RCNP", "1", "1", "The leading lady shared a scene with the comedian.", "", "", "Did the leading lady forget someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["3", "unconstraining_RCNP", "2", "1", "The leading lady shared a scene with the comedian.", "", "", "Enter a number between 1 and 100.", "Free", ['']],
		["3", "unconstraining_RCNP", "2", "2", "The leading lady shared a scene with the comedian.", "", "", "Write a short story for us.", "Free", ['']],
		["3", "unconstraining_NP2", "1", "1", "The leading lady shared a scene with the comedian.", "", "", "Did the leading lady forget someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["3", "unconstraining_NP2", "2", "1", "The leading lady shared a scene with the comedian.", "", "", "Enter a number between 1 and 100.", "Free", ['']],
		["3", "unconstraining_NP2", "2", "2", "The leading lady shared a scene with the comedian.", "", "", "Write a short story for us.", "Free", ['']],
		["1", "A", "1", "1", "The blue ball was in the room.", "", "", "What color was the mattress?", "Radio", ['Red', 'Blue', 'Unclear']],
		["1", "B", "1", "1", "The blue mattress was in the room.", "", "", "What color was the mattress?", "Radio", ['Red', 'Blue', 'Unclear']],
		["2", "A", "1", "1", "Johnny had a baseball glove.", "", "", "Did Johnny have a ball?", "Radio", ['Yes', 'No', 'Maybe']],
		["2", "B", "1", "1", "Johnny had a baseball.", "", "", "Did Johnny have a ball?", "Radio", ['Yes', 'No', 'Maybe']],
		["3", "A", "1", "1", "There are 7 days in a week.", "", "", "How many days are in a month?", "Radio", ['7', '30', '365']],
		["3", "B", "1", "1", "There are 7 days in a week.", "", "", "How many days are in a week?", "Radio", ['7', '30', '365']],
	];
