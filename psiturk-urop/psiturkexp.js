var Experiment = function() {

	var trials = [
		["1", "The editor saw the senator.", "Did the editor see someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["2", "The accountant contacted the secretary.", "Did the accountant contact someone?", "Check", ['Yes', 'No', 'Maybe']],
		["3", "The fox said, hatee-hatee-hatee-ho.", "What does the fox say?", "Free", ['Ring-ding? Hatee-ho?']],
	];
	trials = _.shuffle(trials);

	var askedTime, listening = false;
	var next = function() {
		if(trials.length===0) {
			finish();
		}
		else {
			trial=trials.shift();
			display_question(trial[1], trial[2], trial[3], trial[4]);
			askedTime= new Date().getTime();
			listening=true;
		}
	};

	var response_handler = function(e) {
		if (!listening) return;
	};

	var finish = function() {
		currentview = new Questionnaire();
	};

	var display_question = function(text, question, answertype, answers) {
		if(answertype === "Free")
			d3.select("#trial")
				.append("div")
				.attr("id", "free")
				.text(text);
	};

	psiTurk.showPage("stage.html");
	next();
};