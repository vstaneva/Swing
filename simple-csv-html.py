import csv
import random

def parseCSV (path):
    """Parses .csv experiment file (see documentation for .csv file formatting instructions.)
       It currently has the following columns: (int) "ITEM", (string) "CONDITION",
       (string) "FORM TEXT", (string) "QUESTION", (string) "TYPE", (string) "ANSWERS"  """
    tasklist = []
    with open(path, 'rU') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
            tasklist.append(row)
    tasklist.remove(tasklist[0])
    return tasklist

def getRandomItem(tasks):
    """Tasks is a list of lines from the CSV file. We assume that all of the elements
       have the same item number.
       Currently, we assume that there is one condition per item.
       Be careful here^. In the future we'd like to select by Condition, not by Item.
       How to do that:
           1. We could separate tasks by (item,condition) and select a random condition, or
           2. We could select a random item and execute all the items that have the same condition as it."""
    return random.choice(tasks)
    
def CVStoHTML(tasks):
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
    return HTMLstuffing

def HTMLfiller(item,stuffing, fpath):
    #for task in stuffing:
    path = fpath + str(item) + ".html"
    htmlfile = open(path, 'w')
    htmlfile.write( "<html>\n<head>\n</head>\n<body>\n")
    htmlfile.write( "<p> Experiment </p>\n")
    #condition, form text and question
    htmlfile.write( "<p>%s</p>\n<p>%s</p>\n<p>%s</p>\n" % (stuffing[item][0], stuffing[item][2], stuffing[item][3]))
    htmlfile.write( "<ul>\n<li> Answer1 </li>\n<li> Answer 2 </li>\n<li> Answer 3 </li>\n</ul>\n")
    htmlfile.write( "</body>\n</html>" )

tasklist = parseCSV("/Users/val/Documents/UROP-Fall2015/urop/small_example.csv")
HTMLfilepath = "/Users/val/Documents/UROP-Fall2015/urop/gen/gen"
#for task in tasklist:
#    print task
HTMLstuffing = CVStoHTML(tasklist)
#print HTMLstuffings
HTMLfiller(0, HTMLstuffing, HTMLfilepath)

