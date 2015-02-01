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
		["1", "unconstraining_NP2", "1", "1", "The editor saw the reporter.", "", "", "Did the editor see someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["1", "constraining_NP2", "1", "1", "The editor hired the reporter.", "", "", "Did the editor see someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["1", "constraining_RCNP", "1", "1", "The editor hired the senator.", "", "", "Did the editor see someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["2", "unconstraining_NP2", "1", "1", "The accountant contacted the executive.", "", "", "Did the accountant contact someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["2", "unconstraining_RCNP", "1", "1", "The accountant contacted the secretary.", "", "", "Did the accountant contact someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["2", "constraining_NP2", "1", "1", "The accountant wrote a report for the executive.", "", "", "Did the accountant contact someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["2", "constraining_RCNP", "1", "1", "The accountant wrote a report for the secretary.", "", "", "Did the accountant contact someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["3", "constraining_RCNP", "1", "1", "The leading lady shared a scene with the comedian.", "", "", "Did the leading lady forget someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["3", "constraining_RCNP", "2", "1", "The leading lady shared a scene with the comedian.", "", "", "Enter a number between 1 and 100.", "Free", ['Please type your number here']],
		["3", "constraining_RCNP", "2", "2", "The leading lady shared a scene with the comedian.", "", "", "Write a short story for us.", "Free", ['Please write your short story here']],
		["3", "constraining_NP2", "1", "1", "The leading lady shared a scene with the comedian.", "", "", "Did the leading lady forget someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["3", "constraining_NP2", "2", "1", "The leading lady shared a scene with the comedian.", "", "", "Enter a number between 1 and 100.", "Free", ['Please type your number here']],
		["3", "constraining_NP2", "2", "2", "The leading lady shared a scene with the comedian.", "", "", "Write a short story for us.", "Free", ['Please write your story here']],
		["3", "unconstraining_RCNP", "1", "1", "The leading lady shared a scene with the comedian.", "", "", "Did the leading lady forget someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["3", "unconstraining_RCNP", "2", "1", "The leading lady shared a scene with the comedian.", "", "", "Enter a number between 1 and 100.", "Free", ['Please type your number here']],
		["3", "unconstraining_RCNP", "2", "2", "The leading lady shared a scene with the comedian.", "", "", "Write a short story for us.", "Free", ['Please write your story here']],
		["3", "unconstraining_NP2", "1", "1", "The leading lady shared a scene with the comedian.", "", "", "Did the leading lady forget someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["3", "unconstraining_NP2", "2", "1", "The leading lady shared a scene with the comedian.", "", "", "Enter a number between 1 and 100.", "Free", ['Please type your number here']],
		["3", "unconstraining_NP2", "2", "2", "The leading lady shared a scene with the comedian.", "", "", "Write a short story for us.", "Free", ['Please write your story here']],
	];
	var practice_trials = [
		["1", "", "", "", "The editor saw the reporter.", "", "", "Did the editor see someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["2", "", "", "", "The accountant wrote a report for the secretary.", "", "", "Did the accountant contact someone?", "Check", ['Yes', 'No', 'Maybe']],
		["3", "", "", "", "The fox said, hatee-hatee-hatee-ho.", "", "", "What does the fox say?", "Free", ['Ring-ding? Hatee-ho?']],
	];
	//trials = _.shuffle(trials);

	var askedTime;

	var next = function() {//this one is ready -- or, is it? it gives an error message, idk
		if(trials.length===0) {
			finish();
		}
		else {
			if(trials.length===1){
				d3.select("#nextq").
					attr("value", "Submit");
			}
			trial=trials.shift();
			display_question(trial[1], trial[2], trial[3], trial[4]);
			askedTime= new Date().getTime();
			//listening=true;
		}
	};
	
	var response_handler = function(e) {
		$("input:checkbox:checked, input:radio:checked, input:text").each(function () {
       		var sThisVal = $(this).val();
       		alert (sThisVal);
       		psiTurk.recordTrialData({
    			"phase": "test",
    			"item": trial[0],
   				"text": trial[1],
       			"question": trial[2],
       			"type": trial[3],
       			"checked": sThisVal,
       			"asked": askedTime
       		});
  		});
		remove_question();
		next();
	};

	var finish = function() {
		currentview = new Questionnaire();
	};

	var display_question = function(text, question, answertype, answers) {
		d3.select("#text")
			.data(jQuery.makeArray(text))
			.append("p")
			.text(function(d) { return d; });
		d3.select("#question")
			.data(jQuery.makeArray(question))
			.append("p")
			.text(function(d) { return d; });
		if(answertype == "Free") {
			d3.select("#free")
				.selectAll("input")
				.data(answers)
				.enter()
				.append("input")
				.attr("type", "text")
				.attr("value", function(d) { return d; });
		}
		else if(answertype == "Radio") {
			d3.select("#radio")
				.selectAll("input")
				.data(answers)
				.enter()
				.append('label')
					.attr('for',function(d,i){ return 'a'+i; })
					.text(function(d) { return d; })
				.append("input")
				.attr("type", "radio")
				.attr("name", "radioanswer")
				.attr("value", function(d) { return d; });
		}
		else if(answertype == "Check") {
			d3.select("#check")
				.selectAll("input")
				.data(answers)
				.enter()
				.append('label')
					.attr('for',function(d,i){ return 'a'+i; })
					.text(function(d) { return d; })
				.append("input")
				.attr("type", "checkbox")
				.attr("name", "checkboxanswer")
				.attr("value", function(d) { return d; });
		}
	};
	
	var remove_question = function() {
		d3.select("#text").selectAll("*").remove();
		d3.select("#question").selectAll("*").remove();
		d3.select("#free").selectAll("*").remove();
		d3.select("#radio").selectAll("*").remove();
		d3.select("#check").selectAll("*").remove();
	};

	psiTurk.showPage("stage.html");
	$("input").focus().click(response_handler); 
	next();
};

/****************
* Questionnaire *
****************/

var Questionnaire = function() {

	var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

	record_responses = function() {

		psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'submit'});

		$('textarea').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});
		$('select').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);		
		});

	};

	prompt_resubmit = function() {
		replaceBody(error_message);
		$("#resubmit").click(resubmit);
	};

	resubmit = function() {
		replaceBody("<h1>Trying to resubmit...</h1>");
		reprompt = setTimeout(prompt_resubmit, 10000);
		
		psiTurk.saveData({
			success: function() {
			    clearInterval(reprompt); 
                psiTurk.computeBonus('compute_bonus', function(){finish()}); 
			}, 
			error: prompt_resubmit
		});
	};

	// Load the questionnaire snippet 
	psiTurk.showPage('postquestionnaire.html');
	psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'begin'});
	
	$("#next").click(function () {
	    record_responses();
	    psiTurk.saveData({
            success: function(){
                psiTurk.computeBonus('compute_bonus', function() { 
                	psiTurk.completeHIT(); // when finished saving compute bonus, the quit
                }); 
            }, 
            error: prompt_resubmit});
	});
    
	
};

// Task object to keep track of the current phase
var currentview;

/*******************
 * Run Task
 ******************/
$(window).load( function(){
    psiTurk.doInstructions(
    	instructionPages, // a list of pages you want to display in sequence
    	function() { currentview = new Experiment(); } // what you want to do when you are done with instructions
    );
});