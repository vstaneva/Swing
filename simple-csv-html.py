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
def HTMLfiller (item,stuffing, fpath): #Slightly out-of-date
    """This function makes the HTML code for a task with ITEM=item from the stuffing
       and pastes this code into an HTML page, which goes to a file path
       specified in fpath.
       TODO: Divide the file path from the file name in the variable
       so that it's easier for people to use the code.
    """
    #for task in stuffing:
    path = fpath + "templates/" +str(item) + ".html"
    htmlfile = open(path, 'w')
    htmlfile.write( "<html>\n<head>\n</head>\n<body>\n")
    htmlfile.write( "<p> Experiment </p>\n")
    #condition, form text and question
    htmlfile.write( "<p>%s</p>\n<p>%s</p>\n<p>%s</p>\n" % (stuffing[item][0], stuffing[item][2], stuffing[item][3]))
    htmlfile.write( "<ul>\n<li> Answer1 </li>\n<li> Answer 2 </li>\n<li> Answer 3 </li>\n</ul>\n")
    htmlfile.write( "</body>\n</html>" )

def JSgenForPsiTurk(stuffing, path):
    """Provides similar functionality to JSgen(). However, it works with
       NYU's PsiTurk software.
    """
    jsfile = open(path, 'w')
    jsfile.write('var Experiment = function() {\n\n')
    jsfile.write('\tvar trials = [\n')
    # Load the array of trials
    for trial in stuffing:
        jsfile.write('\t\t["%s", "%s", "%s", "%s", %s],\n'%(trial[0], trial[2], trial[3], trial[4], parseAns(trial[5])))
    jsfile.write('\t];')
    
    #what do we do at every question
    
    #how to handle responses
    
    #what to do at last question
    
    #other functionality
    
    jsfile.write('};')
    

def JSgen (stuffing, path):
    """This function works together with HTMLwJSgen().
       It generates a JavaScript file which has all the data of the experiment:
       the conditions tested, as well as the displayed text, question and answers.
       The data injected into the JS arrays comes from the stuffing, and the
       produced JS file is saved in a file as specified by path.
    """
    jsfile = open(path, 'w');
    jsfile.write('var conditions = new Array();\nvar text = new Array();\nvar questions = new Array();\nvar answerTypes = new Array();\nvar answers = new Array();\n');
    #fill in the arrays -> should do by Stuffing.
    row = 0
    for task in stuffing:
        jsfile.write('conditions[%d]="%s";'%(row, stuffing[row][0]))
        jsfile.write('text[%d]="%s";'%(row, stuffing[row][2]))
        jsfile.write('questions[%d]="%s";'%(row, stuffing[row][3]))
        jsfile.write('answerTypes[%d]="%s";'%(row, stuffing[row][4]))
        jsfile.write('answers[%d]=%s;'%(row, parseAns(stuffing[row][5])))
        jsfile.write('\n')
        row+=1
    jsfile.write("var row=0, radioAnswerList=\"\", checkAnswerList = \"\";\n")
    jsfile.write('function newValue(){\ndocument.getElementById("condition").innerHTML = conditions[row];\ndocument.getElementById("text").innerHTML = text[row];\ndocument.getElementById("question").innerHTML = questions[row];\n')
    #here see what answers for this row are and show/hide accordingly
    jsfile.write('if(answerTypes[row]=="Radio"){\n')
    jsfile.write('document.getElementById("free").style.visibility="hidden";\ndocument.getElementById("check").style.visibility="hidden";\ndocument.getElementById("radio").style.visibility="visible";\n')
    jsfile.write('document.getElementById("free").style.height="0px";\ndocument.getElementById("check").style.height="0px";\ndocument.getElementById("radio").style.height="250px";\n')
    #generate radioAnswers
    jsfile.write('radioAnswerList="";\nfor (i = 0; i < answers[row].length; i++) {\n radioAnswerList+="<input type=\\"radio\\" name=\\"question\\""+row.toString()+" value=\\"answer\\""+i.toString()+">"+answers[row][i]+"<br>";}\n')
    jsfile.write('document.getElementById("radio").innerHTML=radioAnswerList;')
    #here make sure radio answers are displayed like radio
    jsfile.write('}\nif(answerTypes[row]=="Check"){\n')
    jsfile.write('document.getElementById("free").style.visibility="hidden";\ndocument.getElementById("check").style.visibility="visible";\ndocument.getElementById("radio").style.visibility="hidden";\n')
    jsfile.write('document.getElementById("free").style.height="0px";\ndocument.getElementById("check").style.height="250px";\ndocument.getElementById("radio").style.height="0px";\n')
    #jsfile.write('document.getElementById("check").innerHTML="<input type=\\"checkbox\\" name=\\"question\\" value=\\"answer1\\">Checkbox<br><input type=\\"checkbox\\" name=\\"question\\" value=\\"answer2\\">Answer"')
    #here make sure ckeckboxes are displayed as checkboxes
    #generate checkAnswers
    jsfile.write('checkAnswerList="";\nfor (i = 0; i < answers[row].length; i++) {\n checkAnswerList+="<input type=\\"checkbox\\" name=\\"question\\""+row.toString()+" value=\\"answer\\""+i.toString()+">"+answers[row][i]+"<br>";}\n')
    jsfile.write('document.getElementById("check").innerHTML=checkAnswerList;')
    jsfile.write('}\nif(answerTypes[row]=="Free"){\n')
    jsfile.write('document.getElementById("free").style.visibility="visible";\ndocument.getElementById("check").style.visibility="hidden";\ndocument.getElementById("radio").style.visibility="hidden";\n')
    jsfile.write('document.getElementById("free").style.height="250px";\ndocument.getElementById("check").style.height="0px";\ndocument.getElementById("radio").style.height="0px";\n')
    jsfile.write('document.getElementById("free").innerHTML="<input type=\\"text\\" name=\\"question\\">"')
    jsfile.write('}\nif(row<(text.length-1))row=row+1;\n}')

def HTMLwJSgen (stuffing, fpath):
    """This function produces an HTML file which requires a JS external function
       which is generated by the JSgen() function. This function writes in an HTML
       file found as specified by fpath, and passes the stuffing and the file
       path to JSgen().
    """
    path = fpath + "templates/exp.html"
    jspath = fpath + "static/js/exp.js"
    JSgen(stuffing, jspath)
    htmlfile = open(path, 'w')
    htmlfile.write('<html>\n<head></head>\n<body>\n')
    htmlfile.write('<form><p> Experiment </p>\n')
    #condition, form text and question
    htmlfile.write( '<p id="condition">Test Condition</p>\n<p id="text">Test Text</p>\n<p id="question">Test Question</p>\n')
    #radio answers
    htmlfile.write('<div id="radio" style="visibility:hidden height:0px">Radio</div>')
    #checkbox answers
    htmlfile.write('<div id="check" style="visibility:hidden height:0px">Checkbox</div>')
    #free text answers
    htmlfile.write('<div id="free" style="visibility:hidden height:0px">Free text</div>')
    #work on this. these should be removable, too. Until then, comment the whole Answers thing
    htmlfile.write('<button type="button" onclick="newValue()">Next</button></form>')
    htmlfile.write('<script src="'+ jspath + '"></script>')
    htmlfile.write('</body>\n</html>')

######THIS RUNS EVERYTHING######
tasklist = parseCSV("/Users/val/Documents/UROP-Fall2015/urop/small_example.csv")
HTMLfilepath = "/Users/val/Documents/UROP-Fall2015/urop/psiturk-urop/"
#for task in tasklist:
#    print task
HTMLstuffing = ChooseRandomTasks(tasklist)
JSgenForPsiTurk(HTMLstuffing, HTMLfilepath+"psiturkexp.js")
print HTMLstuffing[0]
#HTMLfiller(0, HTMLstuffing, HTMLfilepath)
#print parseAns("Yes#No#Maybe#I don't know#Answer")
HTMLwJSgen(HTMLstuffing, HTMLfilepath)

## Strategy: What if we ALWAYS have radio button answers, a free text box, and
## a multiple choice answers structures, but we show and hide them according
## to what the page wants us to show.

