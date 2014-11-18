import csv
import random

######PARSERS#######
def parseCSV (path):
    """Parses .csv experiment file (see documentation for .csv file formatting instructions.)
       It currently has the following columns: (int) "ITEM", (string) "CONDITION",
       (string) "FORM TEXT", (string) "QUESTION", (string) "TYPE", (string) "ANSWERS"
    """
    tasklist = []
    with open(path, 'rU') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            tasklist.append(row)
    tasklist.remove(tasklist[0])
    return tasklist

def parseAns (answerRow):
    """parse answerRow to answerList[] by looking up the #'s"""
    answerList = answerRow.split("#")
    print answerList
    return answerList

######CHOOSING TASKS#######
def getRandomItem (tasks):
    """Tasks is a list of lines from the CSV file. We assume that all of the elements
       have the same item number.
       Currently, we assume that there is one condition per item.
       Be careful here^. In the future we'd like to select by Condition, not by Item.
       How to do that:
           1. We could separate tasks by (item,condition) and select a random condition, or
           2. We could select a random item and execute all the items that have the same condition as it.
    """
    return random.choice(tasks)
    
def ChooseRandomTasks (tasks):
    """Tasks is a list of lines from the CSV file. We shuffle all the tasks which
       have the same item number, and pass that to getRandomItem(), so that we get
       a randomly chosen task every time.
       At the end we have a set of N tasks, one which has ITEM=1, one which has ITEM=2
       and so on, the last task has ITEM=N.
       These tasks are the 'stuffing' for our HTML and JS templates.
    """
    sameItem = []
    HTMLstuffing = []
    for row in tasks:
        if not sameItem:
            sameItem.append(row)
        elif row[0]==sameItem[len(sameItem)-1][0]:
            sameItem.append(row)
        else:
            HTMLstuffing.append(getRandomItem(sameItem))
            sameItem = []
    if sameItem:
        HTMLstuffing.append(getRandomItem(sameItem))
    return HTMLstuffing
    
######FILL IN THE GAPS######
def JSgenForPsiTurk(stuffing, path):
    """Provides similar functionality to JSgen() from simple-csv-html.py.
       However, this works with NYU's PsiTurk software.
    """
    jsfile = open(path, 'w')
    jsfile.write('var Experiment = function() {\n\n')
    jsfile.write('\tvar trials = [\n')
    # Load the array of trials
    for trial in stuffing:
        jsfile.write('\t\t["%s", "%s", "%s", "%s", %s],\n'%(trial[0], trial[2], trial[3], trial[4], parseAns(trial[5])))
    jsfile.write('\t];\n\ttrials = _.shuffle(trials);\n\n\tvar askedTime, listening = false;\n\n')
    
    #what do we do at every question
    jsfile.write('\tvar next = function() {//this one is ready\n')
    jsfile.write('\t\tif(trials.length===0) {\n\t\t\tfinish();\n\t\t}\n') #check if this is the last trial
    jsfile.write('\t\telse {\n') #what are we doing for this question
    jsfile.write('\t\t\ttrial=trials.shift();\n\t\t\tdisplay_question(trial[1], trial[2], trial[3], trial[4]);\n\t\t\taskedTime= new Date().getTime();\n')
    jsfile.write('\t\t\tlistening=true;\n\t\t}\n\t};\n\n')
    
    #how to handle responses
    jsfile.write('\tvar response_handler = function(e) { //this one I will code soon\n')
    jsfile.write('\t\tif (!listening) return;\n\t\tnext();\n')
    #how to get the response from the user?!
    jsfile.write('\t};\n\n')

    #what to do at last question
    jsfile.write('\tvar finish = function() {//this is ready\n\t\tcurrentview = new Questionnaire();\n\t};\n\n')
    
    #display question
    jsfile.write('\tvar display_question = function(text, question, answertype, answers) {\n')
    jsfile.write('\t\td3.select("#text")\n\t\t\t.data(jQuery.makeArray(text))\n\t\t\t.append("p")\n\t\t\t.text(function(d) { return d; });\n')
    jsfile.write('\t\td3.select("#question")\n\t\t\t.data(jQuery.makeArray(question))\n\t\t\t.append("p")\n\t\t\t.text(function(d) { return d; });\n')
    jsfile.write('\t\tif(answertype == "Free") {\n')
    jsfile.write('\t\t\td3.select("#free")\n\t\t\t\t.selectAll("p")\n\t\t\t\t.data(answers)\n\t\t\t\t.enter()\n\t\t\t\t.append("p")\n\t\t\t\t.style("color","red")\n\t\t\t\t.text(function(d) { return d; });\n')
    jsfile.write('\t\t}\n')
    jsfile.write('\t\telse if(answertype == "Radio") {\n')
    jsfile.write('\t\t\td3.select("#radio")\n\t\t\t\t.selectAll("p")\n\t\t\t\t.data(answers)\n\t\t\t\t.enter()\n\t\t\t\t.append("p")\n\t\t\t\t.style("color","green")\n\t\t\t\t.text(function(d) { return d; });\n')
    jsfile.write('\t\t}\n')
    jsfile.write('\t\telse if(answertype == "Check") {\n')
    jsfile.write('\t\t\td3.select("#check")\n\t\t\t\t.selectAll("p")\n\t\t\t\t.data(answers)\n\t\t\t\t.enter()\n\t\t\t\t.append("p")\n\t\t\t\t.style("color","blue")\n\t\t\t\t.text(function(d) { return d; });\n')
    jsfile.write('\t\t}\n')
    
    jsfile.write('\t};\n\n')
    
    #other functionality
    jsfile.write('\tpsiTurk.showPage("stage.html");\n')
    jsfile.write('\tnext();\n')
    jsfile.write('};')
    
######THIS RUNS EVERYTHING######
tasklist = parseCSV("/Users/val/Documents/UROP-Fall2015/urop/small_example.csv")
HTMLfilepath = "/Users/val/Documents/UROP-Fall2015/urop/psiturk-urop/"
HTMLstuffing = ChooseRandomTasks(tasklist)
JSgenForPsiTurk(HTMLstuffing, HTMLfilepath+"psiturkexp.js")

