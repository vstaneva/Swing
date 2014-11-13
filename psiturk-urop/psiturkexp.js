var Experiment = function() {

	var trials = [
		["1", "The editor saw the senator.", "Did the editor see someone?", "Radio", ['Yes', 'No', 'Maybe']],
		["2", "The accountant wrote a report for the secretary.", "Did the accountant contact someone?", "Check", ['Yes', 'No', 'Maybe']],
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
			display_question(trial[1],trial[2], trial[3], trial[4]);
			askedTime= new Date().getTime();
			listening=true;
		}
};