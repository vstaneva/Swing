var Experiment = function() {

	var trials = [
		["1", "The editor saw the senator.", "Did the editor see someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["2", "The accountant wrote a report for the secretary.", "Did the accountant contact someone?", "Check", ['Yes', 'No', 'Maybe']],
		["3", "The fox said, hatee-hatee-hatee-ho.", "What does the fox say?", "Free", ['Ring-ding? Hatee-ho?']],
	];
	trials = _.shuffle(trials);

	var askedTime, listening = false;

	var next = function() {//this one is ready
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

	var response_handler = function(e) { //this one I will code soon
		if (!listening) return;
		next();
	};

	var finish = function() {//this is ready
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

	var remove_word = function() {
		d3.select("#free").remove();
		d3.select("#radio").remove();
		d3.select("#check").remove();
	};

	psiTurk.showPage("stage.html");
	next();
};