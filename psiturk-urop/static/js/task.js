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

/**
 * Presents the experiment described in the input CSV file. This function does
 * not return a value.
 * 
 * @class Experiment
 */
var Experiment = function () {
	/**
	 * <p>This array is injected into the code by Swing's Python CSV parser.</p>
	 * 
 	 * <p>There is the following hierarchy in the way experiments are structured:<br>
 	 * -- There are several items in an experiment, such that the participants
 	 *    see each item<br>
 	 * -- Each item has a number of conditions, such that the participants
 	 *    see only one condition per item<br>
 	 * -- Each (item, condition) pair has several questions that are shown<br>
 	 * -- Each of these questions belongs to a (set, order) pair, such that
 	 *    all the questions in the same set appear in the same screen
 	 *    and all the questions in the same set appear by their order number.
 	 *    This way, for a particular set, first are displayed the questions
 	 *    with order=1, then the questions with order=2 and so on.</p>
	 * 
	 * <p>Moreover, the trials consist of the following elements, ordered by their index:<br>
	 * [0]: item<br>
	 * [1]: condition<br>
	 * [2]: set<br>
	 * [3]: order<br>
	 * [4]: text prompt ("" if no text prompt)<br>
	 * [5]: picture prompt ("" if no picture prompt)<br>
	 * [6]: audio prompt ("" if no audio prompt)<br>
	 * [7]: question<br>
	 * [8]: answer type -- can be any of the following:<br>
	 * -- "Radio" for radio buttons<br>
	 * -- "Check" for checkboxes (multiple choice)<br>
	 * -- "Free" for a textbox<br>
	 * -- "Textarea" for a bigger textbox<br>
	 * -- "Slider" for a jQuery UI slider. Note that the slider's left side is always 0
	 *    and its right side is always 100<br>
	 * [9]: answers --<br>
	 * -- for "Radio" and "Check", the options that the participant can choose among<br>
	 * -- for "Free", a suggested text that can be filled in.<br>
	 * -- for "Slider", the labels on the left and right side of the slider.<p>
	 *
	 * @name experimentTrials
	 */
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
        ["3", "constraining_RCNP", "2", "1", "The leading lady shared a scene with the comedian.", "", "", "Write a short story for us.", "Textarea", ['Please write your short story here']],
        ["3", "constraining_NP2", "1", "1", "The leading lady shared a scene with the comedian.", "", "", "Did the leading lady forget someone?", "Radio", ['Yes', 'No', 'Maybe']],
        ["3", "constraining_NP2", "2", "1", "The leading lady shared a scene with the comedian.", "", "", "Enter a number between 1 and 100.", "Free", ['Please type your number here']],
        ["3", "constraining_NP2", "2", "1", "The leading lady shared a scene with the comedian.", "", "", "Write a short story for us.", "Textarea", ['Please write your story here']],
        ["3", "unconstraining_RCNP", "1", "1", "The leading lady shared a scene with the comedian.", "", "", "Did the leading lady forget someone?", "Radio", ['Yes', 'No', 'Maybe']],
        ["3", "unconstraining_RCNP", "2", "1", "The leading lady shared a scene with the comedian.", "", "", "Enter a number between 1 and 100.", "Free", ['Please type your number here']],
        ["3", "unconstraining_RCNP", "2", "1", "The leading lady shared a scene with the comedian.", "", "", "Write a short story for us.", "Textarea", ['Please write your story here']],
        ["3", "unconstraining_NP2", "1", "1", "The leading lady shared a scene with the comedian.", "", "", "Did the leading lady forget someone?", "Radio", ['Yes', 'No', 'Maybe']],
        ["3", "unconstraining_NP2", "2", "1", "The leading lady shared a scene with the comedian.", "", "", "Enter a number between 1 and 100.", "Free", ['Please type your number here']],
        ["3", "unconstraining_NP2", "2", "1", "The leading lady shared a scene with the comedian.", "", "", "Write a short story for us.", "Textarea", ['Please write your story here']],
        ["4", "unconstraining_NP2", "1", "1", "The editor works every day of the week.", "", "https://ia802508.us.archive.org/5/items/testmp3testfile/mpthreetest.mp3", "When does the editor work?", "Slider", ['Never', 'Always']],
        ["4", "constraining_NP2", "1", "1", "The editor works only on weekends.", "", "https://ia802508.us.archive.org/5/items/testmp3testfile/mpthreetest.mp3", "When does the editor work?", "Slider", ['Never', 'Always']],
        ["4", "constraining_RCNP", "1", "1", "The editor works only on Monday, Wednesday, and on weekends.", "", "https://ia802508.us.archive.org/5/items/testmp3testfile/mpthreetest.mp3", "When does the editor work?", "Slider", ['Never', 'Always']],
        ["5", "constraining_RCNP", "1", "1", "Caroline last ate at 6pm.", "http://cdn.foodbeast.com/content/uploads/2015/04/SP-Pizza-Chowder.jpg", "", "How hungry is Caroline?", "Slider", ['Not hungry at all', 'Very hungry']]
    ];
    
    /**
 	 * The practice trials are shown before the real experiment trials. Therefore,
 	 * practiceTrials[] does not need to be injected by another script
 	 * and is not expected to change.
 	 * 
 	 * The array has the same structure as experimentTrials[].
	 *
	 * @name practiceTrials
	 */
    var practiceTrials = [
        ["1", "", "", "", "The editor saw the reporter.", "", "", "Did the editor see someone?", "Radio", ['Yes', 'No', 'Maybe']],
        ["2", "", "", "", "The accountant wrote a report for the secretary.", "", "", "Did the accountant contact someone?", "Check", ['Yes', 'No', 'Maybe']],
        ["3", "", "", "", "The fox said, hatee-hatee-hatee-ho.", "", "", "What does the fox say?", "Free", ['Ring-ding? Hatee-ho?']]
    ];

    var trials = [];
    
    /**
 	 * Choose and finish the trials that do into the experiment. For each item, the
 	 * function chooses which condition to display. Trials are then shuffled by item,
 	 * so that trials that belong to the same (item, condition) pair are not internally
 	 * shuffled -- this way, the (set, order) of the questions in this (item, condition)
 	 * pair is preserved.
 	 * 
 	 * This function does not return a value.
	 * 
	 * @class shuffle_trials
	 */
    var shuffle_trials = function () {
        var currItem = 1, i, trial, starti = 0, lengthi = 0, section = [], chosenTrials = [], currConditions = [], itemConditionPairs = [], choseni, currCond = "";
        for (i = 0; i < experimentTrials.length; i += 1) {
            trial = experimentTrials[i];
            if (parseInt(trial[0]) !== currItem) { //look! it's a new item
                //choosing which (item, condition) pair to show
                choseni = (~~(Math.random() * (currConditions.length)));
                itemConditionPairs[itemConditionPairs.length] = [currItem, currConditions[choseni]];
                //resetting
                currConditions = []; // please be empty
                currItem += 1;
            }
            if (currConditions.length === 0) {//currConditions is empty
                currConditions[currConditions.length] = [trial[1], i, 1, trial[0]];
            } else {//currConditions is not empty at all
                if (currCond[0] !== trial[1]) {//this is the first question of the condition
                    currConditions[currConditions.length] = [trial[1], i, 1, trial[0]];
                } else { //this is a subsequent question of the same condition
                    currConditions[currConditions.length - 1][2] = currConditions[currConditions.length - 1][2] + 1;
                }
            }
            if (currConditions.length) {
                currCond = currConditions[currConditions.length - 1];
            }
        }
        choseni = (~~(Math.random() * (currConditions.length)));
        itemConditionPairs[itemConditionPairs.length] = [currItem, currConditions[choseni]];
        //shuffle all the itemConditionPairs
        itemConditionPairs = _.shuffle(itemConditionPairs);
        //fill up the trials[] with these itemConditionPairs[]
        for (i = 0; i < itemConditionPairs.length; i += 1) {
            section = itemConditionPairs[i][1];
            starti = section[1];
            lengthi = section[2];
            chosenTrials = experimentTrials.slice(starti, lengthi + starti);
            trials = trials.concat(chosenTrials);
        }
    };
    
    var ind = 0, askedTime, trial, last = -1, slideritem = -1, slidercondition = -1, slidersetnumber = -1, sliderorder = -1;
    
    /**
 	 * Display the next questions. This function is responsible only
 	 * for the first question in a particular order. It is also responsible
 	 * for calling the response_handler function.
 	 * This function does not return a value.
	 * 
	 * @class shuffle_trials
	 */
    var next = function () {
        if (trials.length == 0) {
            finish();
            return;
        } else {
            trial = trials.shift();
            ind += 1;
            display_question(ind, trial[0], trial[1], trial[2], trial[3], trial[4], trial[5],trial[6], trial[7], trial[8], trial[9]);
            askedTime = new Date().getTime();
            $("#nextq" + ind).focus().on("click", {item: trial[0], condition:trial[1], setNumber:trial[2], order:trial[3]}, response_handler);
        }
    };
    
    /**
 	 * Activated in next() by the click() functionality. This function handles clicking
 	 * the "Next question" button. It checks if the current questions are answered:
 	 * -- "Radio", "Check", "Free" are <input> elements and can be checked internally
 	 * -- "Slider" is a jQuery UI element, therefore we have to manually check
 	 *    whether a slider question has been answered or not.
 	 * If the questions have been answered, the function records the answers, flushes
 	 * the questions from the screen and proceeds to display the next questions.
 	 * 
 	 * This function does not return a value.
	 * 
	 * @class response_handler
	 * @param {event} e -- the event that the button is clicked
	 * @param {number} qNo -- the number of the question
	 */
    var response_handler = function (e) {
        var answered = false;
        if (last >= 0 && last <= 100) {
        	//these are working alright now
            psiTurk.recordTrialData({
                'phase':'experiment',
                'item': slideritem,
                'condition': slidercondition,
                'set': slidersetnumber,
                'order': sliderorder,
                'viewtime': (new Date().getTime())-askedTime,
                'answer': last
            });
            answered = true;
        } else {
        	
        	//alert($(this).val());
        	$("input:checkbox:checked, input:radio:checked, input:text, textarea").each(function () {
        		//these work just fine.
            	psiTurk.recordTrialData({ 
            		'phase':'experiment',
                	'item': $(this).data().item,
                	'condition': $(this).data().condition,
                	'set': $(this).data().setnumber,
                	'order': $(this).data().order,
                	'viewtime': (new Date().getTime())-askedTime,
                	'answer': $(this).val()
                	
            	});
            	answered = true;
        	});
        }
        if (answered) {
            remove_question();
            next();
        }
    };

	/**
 	 * If all the questions have been displayed, the experiment is over and
 	 * we are re-directed to the post-experiment questionnaire.
 	 * 
 	 * This function does not return a value.
	 * 
	 * @class finish
	 */
    var finish = function () {
    	remove_question();
    	psiTurk.recordTrialData({'phase':'experiment', 'status':'submit'});
        currentview = new Questionnaire();
    };
    
    /**
     * This function used the d3 library to create tag placeholders for new questions.
 	 * 
 	 * This function does not return a value.
	 * 
	 * @class make_new_elements
	 * @param {number} qNo -- the number of the question
	 */
    var make_new_elements = function (qNo) {
        d3.select("#trial")
            .append("div")
            .attr("class", "well")
            .attr("id", "trial" + qNo);
        d3.select("#trial" + qNo)
            .append("div")
            .attr("id", "text" + qNo)
            .attr("class","page-header");
        d3.select("#trial" + qNo)
            .append("div")
            .attr("id", "picture" + qNo);
        d3.select("#trial" + qNo)
            .append("div")
            .attr("id", "audio" + qNo);
        d3.select("#trial" + qNo)
            .append("div")
            .attr("id", "question" + qNo);
        d3.select("#trial" + qNo)
            .append("div")
            .attr("id", "answers" + qNo);
        d3.select("#answers" + qNo)
            .append("form")
            .attr("id", "myForm" + qNo)
            .attr("class", "form-group");
        d3.select("#myForm" + qNo)
            .append("div")
            .attr("id", "radio" + qNo);
        d3.select("#myForm" + qNo)
            .append("div")
            .attr("id", "check" + qNo);
        d3.select("#myForm" + qNo)
            .append("div")
            .attr("id", "textarea" + qNo);
        d3.select("#myForm" + qNo)
            .append("div")
            .attr("id", "free" + qNo);
        d3.select("#myForm" + qNo)
            .append("span")
            .append("div")
            .attr("id", "slider" + qNo);
        d3.select("#myForm" + qNo)
            .append("input")
            .attr("id", "nextq" + qNo)
            .attr("type", "button")
            .attr("class","btn btn-primary btn-lg")
            .style({"margin":"25px"})
            .attr("value", "Next question");
    };

	/**
	 * This function fills in the questions in the tag placeholders. If there are
	 * more than one questions with the same (item, condition, set, order),
	 * the function calls itself recursively to fill all these questions
	 * so that they appear on the screen at the same time.
 	 * 
 	 * This function does not return a value.
	 * 
	 * @class display_question
	 * @param {number} qNo -- the number of the question
	 * @param {string} item -- the item of the question
	 * @param {string} cond -- the condition of the question
	 * @param {string} setNo -- the set of the question
	 * @param {string} order -- the order of the question within the set
	 * @param {string} text -- the text prompt of the question (can be "")
	 * @param {string} picture -- the picture prompt of the question (can be "")
	 * @param {string} audio -- the audio prompt of the question (can be "")
	 * @param {string} answerType -- the type of answer (e.g. "Slider")
	 * @param {string} answers -- the array of answers/labels
	 */
    var display_question = function (qNo, item, cond, setNo, order, text, picture, audio, question, answertype, answers) {
        make_new_elements(qNo);
        last = -1;
        if (text != "") {
            d3.select("#text" + qNo)
                .data(jQuery.makeArray(text))
                .append("p")
                .text(function(d) { return d; });
        }
        if (picture != "") {
            d3.select("#picture" + qNo)
                .data(jQuery.makeArray(picture))
                .append("img")
                .attr("height", "250px")
                .attr("src", function(d){return d;});
            d3.select("#picture" + qNo)
            	.append("hr");
        }
        if (audio != "") {
            d3.select("#audio" + qNo)
                .data(jQuery.makeArray(audio))
                .append("audio")
                .attr("controls", "controls")
                .append("source")
                .attr("src", function(d){return d;});
            d3.select("#audio" + qNo)   
            	.append("hr");
        }
        d3.select("#question" + qNo)
            .data(jQuery.makeArray(question))
            .append("p")
            .text(function(d) { return d; });
        if (answertype == "Free") {
            d3.select("#free" + qNo)
                .selectAll("input")
                .data(answers)
                .enter()
                .append("input")
                .attr("type", "text")
                .attr("value", function(d) { return d; })
                .attr("data-item", item)
                .attr("data-condition", cond)
                .attr("data-setnumber", setNo)
                .attr("data-order", order)
        } else if (answertype == "Textarea") {
            d3.select("#free" + qNo)
                .selectAll("input")
                .data(answers)
                .enter()
                .append("textarea")
                .attr("class", "form-control")
                .text(function(d) { return d; })
                .attr("data-item", item)
                .attr("data-condition", cond)
                .attr("data-setnumber", setNo)
                .attr("data-order", order);
        } else if (answertype == "Radio") {
            d3.select("#radio" + qNo)
                .selectAll("input")
                .data(answers)
                .enter()
                .append('label')
                    .attr('for',function(d,i){ return qNo + 'a' + i; })
                    .attr("class","radio-inline")
                    .text(function(d) { return d; })
                .append("input")
                .attr("type", "radio")
                .attr("name", "radioanswer")
                .attr("class","radio")
                .attr("value", function(d) { return d; })
                .attr("data-item", item)
                .attr("data-condition", cond)
                .attr("data-setnumber", setNo)
                .attr("data-order", order);
        } else if (answertype == "Check") {
            d3.select("#check" + qNo)
                .selectAll("input")
                .data(answers)
                .enter()
                .append('label')
                    .attr('for',function(d,i){ return qNo + 'a' + i; })
                    .attr("class","checkbox-inline")
                    .text(function(d) { return d; })
                .append("input")
                .attr("type", "checkbox")
                .attr("name", "checkboxanswer")
            	.attr("class","checkbox")
                .attr("value", function(d) { return d; })
                .attr("data-item", item)
                .attr("data-condition", cond)
                .attr("data-setnumber", setNo)
                .attr("data-order", order);
        } else if (answertype == "Slider"){
            d3.select("#slider" + qNo)
            	.attr("data-item", item)
                .attr("data-condition", cond)
                .attr("data-setnumber", setNo)
                .attr("data-order", order)
                .append("span")
                .attr("id", "left")
                .style({"float":"left", "padding":"15px"})
                .text(answers[0]);
                $("#slider" + qNo).slider(
                    {
                    slide: function(event, ui) {
                        last = ui.value;
                        slideritem = item;
                        slidercondition = cond;
                        slidersetnumber = setNo;
                        sliderorder = order;
                    }   
                });
            d3.select("#slider" + qNo)
                .append("span")
                .attr("id", "right")
                .style({"float":"right", "padding":"15px"})
                .text(answers[1]);
            d3.select("#nextq" + qNo)
                .style({"margin":"15px"});
        }
        //check if next question also should go with this one
        if (trials.length == 0) {
            return;
        }
        trial = trials[0];
        if (trial[0] == item && trial[1] == cond && trial[2] == setNo && trial[3] == order) {
            d3.select("#nextq"+qNo).remove();
            ind += 1;
            trial = trials.shift();
            display_question(ind, trial[0], trial[1], trial[2], trial[3], trial[4],trial[5],trial[6], trial[7], trial[8], trial[9]);
        }
    };
    
    /**
 	 * This function flushes the screen after the response_handler() calls it.
 	 * 
 	 * This function does not return a value.
	 * 
	 * @class remove_question
	 */
    var remove_question = function() {
        d3.select("#trial").selectAll("*").remove();
    };

    psiTurk.showPage("stage.html");
    psiTurk.recordTrialData({'phase':'experiment', 'status':'begin'});
    shuffle_trials(); 
    next();
    
};

/****************
* Questionnaire *
****************/

var Questionnaire = function () {

    var error_message = "<h1>Oops!</h1><p>Something went wrong submitting your HIT. This might happen if you lose your internet connection. Press the button to resubmit.</p><button id='resubmit'>Resubmit</button>";

    var record_responses = function () {

        psiTurk.recordTrialData({'phase':'postquestionnaire', 'status':'submit'});

        $('textarea').each( function(i, val) {
            psiTurk.recordUnstructuredData(this.id, this.value);
        });
        $('select').each( function(i, val) {
            psiTurk.recordUnstructuredData(this.id, this.value);        
        });

    };

    var prompt_resubmit = function () {
        replaceBody(error_message);
        $("#resubmit").click(resubmit);
    };

    var resubmit = function () {
        replaceBody("<h1>Trying to resubmit...</h1>");
        reprompt = setTimeout(prompt_resubmit, 10000);
        
        psiTurk.saveData({
            success: function () {
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
            success: function (){
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