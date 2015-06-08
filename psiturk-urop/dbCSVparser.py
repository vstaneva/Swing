import csv
import fileinput
import ast


######Read CSV#######
def parseCSV (path):
    """Parses .csv trial data file that is outputted by PsiTurk's download_datafiles command
       and takes only the rows containing information about the experiment."""
    tasklist = []
    with open(path, 'rU') as csvfile:
        reader = csv.reader(csvfile)
        for row in reader:
        	info = ast.literal_eval(row[3])
        	if info['phase']=='experiment' and 'item' in info.keys():
        		tasklist.append(info)
    tasklist.remove(tasklist[0])
    return tasklist

######Write CSV#######
def writeCSV(resultlist, path):
    """Takes the cleaned experiment information and writes it in a new CSV file."""
    with open(path, 'wb') as csvfile:
    	writer = csv.writer(csvfile)
    	writer.writerow(['ITEM', 'CONDITION','SET', 'ORDER', 'VIEWTIME', 'ANSWER'])
    	for result in resultlist:
    		writer.writerow([result['item'], result['condition'], result['set'], result['order'], result['viewtime'], result['answer']])
		


######THIS RUNS EVERYTHING######
tasklist = parseCSV("trialdata.csv")
writeCSV(tasklist, "parsedtrialresults.csv")
