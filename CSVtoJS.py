import csv
import fileinput


######PARSERS#######
def parseCSV (path):
    """Parses .csv experiment file (see documentation for .csv file formatting instructions.)
       It currently has the following columns: (int) "ITEM", (string) "CONDITION", (int) "SET", (int) "ORDER",
       (string) "FORM TEXT", (string) "PICTURE", (string) "AUDIO" (string) "QUESTION", (string) "TYPE", (string) "ANSWERS"
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
    
    
######FILL IN THE GAPS######
def CSVtoJS(stuffing, path):
    """Provides similar functionality to JSgen() from simple-csv-html.py.
       However, this works with NYU's PsiTurk software.
    """
    istimetowrite = 0
    for line in fileinput.input(path, inplace=1):
    	if (istimetowrite == 1):
    		print ('\tvar trials = [\n'),
    		for trial in stuffing:
        		print ('\t\t["%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", %s],\n'%(trial[0],trial[1],trial[2], trial[3], trial[4], trial[5], trial[6], trial[7], trial[8], parseAns(trial[9]))),
    		print ('\t];\n'),
    		istimetowrite = 2
    	else:
    		print line,
    	if line.startswith('var Experiment = function() {'):
    		istimetowrite = istimetowrite+1


######THIS RUNS EVERYTHING######
tasklist = parseCSV("/Users/val/Documents/UROP-Fall2015/urop/real_csv.csv")
JSfilepath = "/Users/val/Documents/UROP-Fall2015/urop/psiturk-urop/static/js/"
CSVtoJS(tasklist, JSfilepath+"task1.js")

