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
var Experiment = function() {

	var experimentTrials = [
		["1", "unconstraining_NP2", "1", "1", "The editor saw the reporter.", "", "", "Did the editor see someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["1", "constraining_NP2", "1", "1", "The editor hired the reporter.", "", "", "Did the editor see someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["1", "constraining_RCNP", "1", "1", "The editor hired the senator.", "", "", "Did the editor see someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["2", "unconstraining_NP2", "1", "1", "The accountant contacted the executive.", "", "", "Did the accountant contact someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["2", "unconstraining_RCNP", "1", "1", "The accountant contacted the secretary.", "", "", "Did the accountant contact someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["2", "constraining_NP2", "1", "1", "The accountant wrote a report for the executive.", "", "", "Did the accountant contact someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["2", "constraining_RCNP", "1", "1", "The accountant wrote a report for the secretary.", "", "", "Did the accountant contact someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["3", "constraining_RCNP", "1", "1", "The leading lady shared a scene with the comedian.", "", "", "Did the leading lady forget someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["3", "constraining_RCNP", "2", "1", "The leading lady shared a scene with the comedian.", "", "", "Enter a number between 1 and 100.", "Free", ['Please type your number here']],
		["3", "constraining_RCNP", "2", "1", "The leading lady shared a scene with the comedian.", "", "", "Write a short story for us.", "Free", ['Please write your short story here']],
		["3", "constraining_NP2", "1", "1", "The leading lady shared a scene with the comedian.", "", "", "Did the leading lady forget someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["3", "constraining_NP2", "2", "1", "The leading lady shared a scene with the comedian.", "", "", "Enter a number between 1 and 100.", "Free", ['Please type your number here']],
		["3", "constraining_NP2", "2", "1", "The leading lady shared a scene with the comedian.", "", "", "Write a short story for us.", "Free", ['Please write your story here']],
		["3", "unconstraining_RCNP", "1", "1", "The leading lady shared a scene with the comedian.", "", "", "Did the leading lady forget someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["3", "unconstraining_RCNP", "2", "1", "The leading lady shared a scene with the comedian.", "", "", "Enter a number between 1 and 100.", "Free", ['Please type your number here']],
		["3", "unconstraining_RCNP", "2", "1", "The leading lady shared a scene with the comedian.", "", "", "Write a short story for us.", "Free", ['Please write your story here']],
		["3", "unconstraining_NP2", "1", "1", "The leading lady shared a scene with the comedian.", "", "", "Did the leading lady forget someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["3", "unconstraining_NP2", "2", "1", "The leading lady shared a scene with the comedian.", "", "", "Enter a number between 1 and 100.", "Free", ['Please type your number here']],
		["3", "unconstraining_NP2", "2", "1", "The leading lady shared a scene with the comedian.", "", "", "Write a short story for us.", "Free", ['Please write your story here']],
		["4", "unconstraining_NP2", "1", "1", "The editor works every day of the week.", "", "https://ia802508.us.archive.org/5/items/testmp3testfile/mpthreetest.mp3", "When does the editor work?", "Slider", ['Never', 'Always']],
		["4", "constraining_NP2", "1", "1", "The editor works only on weekends.", "", "https://ia802508.us.archive.org/5/items/testmp3testfile/mpthreetest.mp3", "When does the editor work?", "Slider", ['Never', 'Always']],
		["4", "constraining_RCNP", "1", "1", "The editor works only on Monday, Wednesday, and on weekends.", "", "https://ia802508.us.archive.org/5/items/testmp3testfile/mpthreetest.mp3", "When does the editor work?", "Slider", ['Never', 'Always']],
		["5", "constraining_RCNP", "1", "1", "Caroline last ate at 6pm.", "http://cdn.foodbeast.com/content/uploads/2015/04/SP-Pizza-Chowder.jpg", "", "How hungry is Caroline?", "Slider", ['Not hungry at all', 'Very hungry']],
	];
	var practiceTrials = [
		["1", "", "", "", "The editor saw the reporter.", "", "", "Did the editor see someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["2", "", "", "", "The accountant wrote a report for the secretary.", "", "", "Did the accountant contact someone?", "Check", ['Yes', 'No', 'Maybe']],
		["3", "", "", "", "The fox said, hatee-hatee-hatee-ho.", "", "", "What does the fox say?", "Free", ['Ring-ding? Hatee-ho?']],
	];

	var trials = [];
	
	var shuffle_trials = function(){
		var currItem = 1, starti = 0, lengthi = 0, section = [], chosenTrials = [], currConditions = [], itemConditionPairs = [], choseni, currCond = "";
		for (var i=0; i<experimentTrials.length; i++){
			var trial = experimentTrials[i];
			if(parseInt(trial[0]) !== currItem){ //look! it's a new item
				//choosing which (item, condition) pair to show
				choseni = (~~(Math.random() * (currConditions.length)));
				itemConditionPairs[itemConditionPairs.length] = [currItem, currConditions[choseni]];
				//resetting
				currConditions=[]; // please be empty
				currItem ++;
			}
			if(currConditions.length===0) {//currConditions is empty
				currConditions[currConditions.length] = [trial[1], i, 1, trial[0]];
				}
			else {//currConditions is not empty at all
				if(currCond[0] !== trial[1]){//this is the first question of the condition
					currConditions[currConditions.length] = [trial[1], i, 1, trial[0]];
					}
				else{ //this is a subsequent question of the same condition
					currConditions[currConditions.length-1][2] = currConditions[currConditions.length-1][2]+1;
					}
				}
			
			if(currConditions.length) currCond = currConditions[currConditions.length-1];
		}
		choseni = (~~(Math.random() * (currConditions.length)));
		itemConditionPairs[itemConditionPairs.length] = [currItem, currConditions[choseni]];
		//shuffle all the itemConditionPairs
		itemConditionPairs = _.shuffle(itemConditionPairs);
		//fill up the trials[] with these itemConditionPairs[]
		for(i=0; i<itemConditionPairs.length; i++){
			section = itemConditionPairs[i][1];
			starti = section[1];
			lengthi = section[2];
			chosenTrials = experimentTrials.slice(starti, lengthi+starti);
			trials = trials.concat(chosenTrials);
		}
	}
	var ind = 0, askedTime, trial, last=-1;
	var next = function() {
		if(trials.length==0) {
			finish();
			return;
		}
		else {
			trial=trials.shift();
			ind++;
			display_question(ind, trial[0], trial[1], trial[2], trial[3], trial[4], trial[5],trial[6], trial[7], trial[8], trial[9]);
			askedTime= new Date().getTime();
			$("#nextq"+ind).focus().click(function(){response_handler(ind);}); //the placeholder is never created after the double question
		}
	};
	
	var response_handler = function(e, qNo) {
		var answered = false;
		if(last>=0 && last<=100){
			answered = true;
			//alert(last);
			/*psiturk.recordTrialData({ //figure out how to record the data from the slider! :)
    			"phase": "test",
    			"item": trial[0],
   				"text": trial[1],
       			"question": trial[2],
       			"type": trial[3],
       			"checked": last,
       			"asked": askedTime
       		});*/
		}
		else $("input:checkbox:checked, input:radio:checked, input:text").each(function () {
       		var sThisVal = $(this).val();
       		psiTurk.recordTrialData({ //indices are incorrect! also we're not recording all we would ideally want to
    			"phase": "test",
    			"item": trial[0],
   				"text": trial[1],
       			"question": trial[2],
       			"type": trial[3],
       			"checked": sThisVal,
       			"asked": askedTime
       		});
       	answered = true;
  		});
  		if(answered){
			remove_question();
			next();
			}
	};

	var finish = function() {
		currentview = new Questionnaire();
	};
	
	var make_new_elements = function(qNo) {
		d3.select("#trial")
			.append("div")
			.attr("id", "trial"+qNo);
		d3.select("#trial"+qNo)
			.append("div")
			.attr("id", "text"+qNo);
		d3.select("#trial"+qNo)
			.append("div")
			.attr("id", "picture"+qNo);
		d3.select("#trial"+qNo)
			.append("div")
			.attr("id", "audio"+qNo);
		d3.select("#trial"+qNo)
			.append("div")
			.attr("id", "question"+qNo);
		d3.select("#trial"+qNo)
			.append("div")
			.attr("id", "answers"+qNo);
		d3.select("#answers"+qNo)
			.append("form")
			.attr("id", "myForm"+qNo);
		d3.select("#myForm"+qNo)
			.append("div")
			.attr("id", "radio"+qNo);
		d3.select("#myForm"+qNo)
			.append("div")
			.attr("id", "check"+qNo);
		d3.select("#myForm"+qNo)
			.append("div")
			.attr("id", "free"+qNo);
		d3.select("#myForm"+qNo)
			.append("span")
			.append("div")
			.attr("id", "slider"+qNo);
		d3.select("#myForm"+qNo)
			.append("input")
			.attr("id", "nextq"+qNo)
			.attr("type", "button")
			.attr("value", "Next question");
	}

	var display_question = function(qNo, item, cond, setNo, order, text, picture, audio, question, answertype, answers) {
		make_new_elements(qNo);
		last = -1;
		if(text!="") d3.select("#text"+qNo)
			.data(jQuery.makeArray(text))
			.append("p")
			.text(function(d) { return d; });
		if(picture!="") d3.select("#picture"+qNo)
			.data(jQuery.makeArray(picture))
			.append("img")
			.attr("height", "250px")
			.attr("src", function(d){return d;});
		if(audio!="") d3.select("#audio"+qNo)
			.data(jQuery.makeArray(audio))
			.append("audio")
			.attr("controls", "controls")
			.append("source")
			.attr("src", function(d){return d;});
		d3.select("#question"+qNo)
			.data(jQuery.makeArray(question))
			.append("p")
			.text(function(d) { return d; });
		if(answertype == "Free") {
			d3.select("#free"+qNo)
				.selectAll("input")
				.data(answers)
				.enter()
				.append("input")
				.attr("type", "text")
				.attr("value", function(d) { return d; });
		}
		else if(answertype == "Radio") {
			d3.select("#radio"+qNo)
				.selectAll("input")
				.data(answers)
				.enter()
				.append('label')
					.attr('for',function(d,i){ return qNo+'a'+i; })
					.text(function(d) { return d; })
				.append("input")
				.attr("type", "radio")
				.attr("name", "radioanswer")
				.attr("value", function(d) { return d; });
		}
		else if(answertype == "Check") {
			d3.select("#check"+qNo)
				.selectAll("input")
				.data(answers)
				.enter()
				.append('label')
					.attr('for',function(d,i){ return qNo+'a'+i; })
					.text(function(d) { return d; })
				.append("input")
				.attr("type", "checkbox")
				.attr("name", "checkboxanswer")
				.attr("value", function(d) { return d; });
		}
		else if(answertype == "Slider"){
			d3.select("#slider"+qNo)
				.append("span")
				.attr("id", "left")
				.style({"float":"left", "padding":"15px"})
				.text(answers[0]);
				$("#slider"+qNo).slider(
					{
					slide: function(event, ui) {
        				last = ui.value;
   		 			}	
				});
			d3.select("#slider"+qNo)
				.append("span")
				.attr("id", "right")
				.style({"float":"right", "padding":"15px"})
				.text(answers[1]);
			d3.select("#nextq"+qNo)
				.style({"margin":"15px"});
			}
		//check if next question also should go with this one
		if(trials.length==0){
			return;
		}
		trial = trials[0];
		if(trial[0]==item && trial[1]==cond && trial[2]==setNo && trial[3]==order){
			d3.select("#nextq"+qNo).remove();
			ind++;
			trial = trials.shift();
			display_question(ind, trial[0], trial[1], trial[2], trial[3], trial[4],trial[5],trial[6], trial[7], trial[8], trial[9]);
		}
	};
	
	var remove_question = function() {
		d3.select("#trial").selectAll("*").remove();
	};

	psiTurk.showPage("stage.html");
	shuffle_trials(); 
	next();
	
};

/****************
* Questionnaire *
****************/

var Questionnaire = function() {

	var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

	var record_responses = function() {

		psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'submit'});

		$('textarea').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);
		});
		$('select').each( function(i, val) {
			psiTurk.recordUnstructuredData(this.id, this.value);		
		});

	};

	var prompt_resubmit = function() {
		replaceBody(error_message);
		$("#resubmit").click(resubmit);
	};

	var resubmit = function() {
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