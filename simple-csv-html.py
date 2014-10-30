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
def HTMLfiller (item,stuffing, fpath):
    """This function makes the HTML code for a task with ITEM=item from the stuffing
       and pastes this code into an HTML page, which goes to a file path
       specified in fpath.
       TODO: Divide the file path from the file name in the variable
       so that it's easier for people to use the code.
    """
    #for task in stuffing:
    path = fpath + str(item) + ".html"
    htmlfile = open(path, 'w')
    htmlfile.write( "<html>\n<head>\n</head>\n<body>\n")
    htmlfile.write( "<p> Experiment </p>\n")
    #condition, form text and question
    htmlfile.write( "<p>%s</p>\n<p>%s</p>\n<p>%s</p>\n" % (stuffing[item][0], stuffing[item][2], stuffing[item][3]))
    htmlfile.write( "<ul>\n<li> Answer1 </li>\n<li> Answer 2 </li>\n<li> Answer 3 </li>\n</ul>\n")
    htmlfile.write( "</body>\n</html>" )

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
        jsfile.write('answers[%d]="%s";'%(row, parseAns(stuffing[row][5])))
        jsfile.write('\n')
        row+=1
    jsfile.write("var row=0;\n")
    jsfile.write('function newValue(){\ndocument.getElementById("condition").innerHTML = conditions[row];\ndocument.getElementById("text").innerHTML = text[row];\ndocument.getElementById("question").innerHTML = questions[row];\n')
    #here see what answers for this row are and show/hide accordingly
    jsfile.write('if(answerTypes[row]=="Radio"){\n')
    jsfile.write('document.getElementById("free").style.visibility="hidden";document.getElementById("check").style.visibility="hidden";document.getElementById("radio").style.visibility="visible"; ')
    jsfile.write('}\nif(answerTypes[row]=="Check"){\n')
    jsfile.write('document.getElementById("free").style.visibility="hidden";document.getElementById("check").style.visibility="visible";document.getElementById("radio").style.visibility="hidden"; ')
    jsfile.write('}\nif(answerTypes[row]=="Free"){\n')
    jsfile.write('document.getElementById("free").style.visibility="visible";document.getElementById("check").style.visibility="hidden";document.getElementById("radio").style.visibility="hidden"; ')
    jsfile.write('}\nif(row<(text.length-1))row=row+1;\n}')

def HTMLwJSgen (stuffing, fpath):
    """This function produces an HTML file which requires a JS external function
       which is generated by the JSgen() function. This function writes in an HTML
       file found as specified by fpath, and passes the stuffing and the file
       path to JSgen().
    """
    path = fpath + ".html"
    jspath = fpath + ".js"
    JSgen(stuffing, jspath)
    htmlfile = open(path, 'w')
    htmlfile.write('<html>\n<head></head>\n<body>\n')
    htmlfile.write('<div><p> Experiment </p>\n')
    #condition, form text and question
    htmlfile.write( '<p id="condition">Test Condition</p>\n<p id="text">Test Text</p>\n<p id="question">Test Question</p>\n')
    #radio answers
    htmlfile.write('<p>Radio works!</p><div id="radio" style="visibility:hidden"><ul><li>Radio</li><li>Answer</li></ul></div>')
    #checkbox answers
    htmlfile.write('<p>Check works!</p><div id="check" style="visibility:hidden"><ul><li>Checkbox</li><li>Answer</li></ul></div>')
    #free text answers
    htmlfile.write('<p>Freetext works!</p><div id="free" style="visibility:hidden"><p>Free text will be here</p></div>')
    #work on this. these should be removable, too. Until then, comment the whole Answers thing
    htmlfile.write('<button type="button" onclick="newValue()">Next</button></div>')
    htmlfile.write('<script src="'+ jspath + '"></script>')
    htmlfile.write('</body>\n</html>')

######THIS RUNS EVERYTHING######
tasklist = parseCSV("/Users/val/Documents/UROP-Fall2015/urop/small_example.csv")
HTMLfilepath = "/Users/val/Documents/UROP-Fall2015/urop/gen/gen"
#for task in tasklist:
#    print task
HTMLstuffing = ChooseRandomTasks(tasklist)
print HTMLstuffing[0]
#HTMLfiller(0, HTMLstuffing, HTMLfilepath)
#print parseAns("Yes#No#Maybe#I don't know#Answer")
HTMLwJSgen(HTMLstuffing, HTMLfilepath)

## Strategy: What if we ALWAYS have radio button answers, a free text box, and
## a multiple choice answers structures, but we show and hide them according
## to what the page wants us to show.

