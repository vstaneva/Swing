var Experiment = function() {

	var trials = [
		["1", "The editor saw the reporter.", "Did the editor see someone?", "Radio", ['Yes', 'No', 'Maybe']],
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
		d3.select("#text")
			.enter()
			.append("p")
			.text(text);
		d3.select("#question")
			.enter()
			.append("p")
			.text(question);
		if(answertype === "Free") {
			d3.select("#free")
				.data(answers)
				.enter()
				.append("p").
				.style("color","red")
				.text(function(d) { return d; });
		}
		else if(answertype === "Radio") {
			d3.select("#radio")
				.data(answers)
				.enter()
				.append("p")
				.style("color","green")
				.text(function(d) { return d; });
		}
		else if(answertype === "Check") {
			d3.select("#check")
				.data(answers)
				.enter()
				.append("p")
				.style("color","blue")
				.text(function(d) { return d; });
		}
	};

	psiTurk.showPage("stage.html");
	next();
};