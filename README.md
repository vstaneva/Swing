Swing
=====
Create web-based psychology and cognitive science experiments
---------

Getting started
--------
1. Install PsiTurk. http://psiturk.readthedocs.org/en/latest/install.html
2. Download Swing. https://github.com/vstaneva/urop

Tutorial
-------
1. Describe your experiment in CSV format. Swing will expect a CSV file that looks exactly like inputexample.csv from the example. Please use the format described in ([Input file])
2. Run CSVtoJS.py on your input file
3. Set up the PsiTurk server and run the experiment! http://psiturk.org/quick_start/
4. After running the experiment, collect the data with download_datafiles on the PsiTurk server
5. Run dbCSVparser.py to get nicer-looking results from trialdata.csv. The parsed result is produced in parsedtrialresults.csv

Experiment design
--------
Swing assumes the following hierarchy in the way experiments are structured:
There are several items in an experiment, such that the participants see each item once.
* Each item has a number of conditions, such that the participants see only one condition per item.
* Each (item, condition) pair has several questions that are shown.
* Each of these questions belongs to a (set, order) pair, such that
    * all the questions in the same set appear in the same screen, and
    * all the questions in the same set appear by their order number.
    * This way, for a particular set, first are displayed the questions with order=1, then the questions with order=2 and so on.

Input file
--------
Please use the following convention for describing your experiment as a CSV file.
The following columns are specified, in this order:
* item
* condition
* set
* order
* text prompt ("" if no text prompt)
* picture prompt ("" if no picture prompt)
* audio prompt ("" if no audio prompt)
* question<br>
* answer type -- can be any of the following:
  * "Radio" for radio buttons
  * "Check" for checkboxes (multiple choice) 
  * "Free" for a textbox
  * "Textarea" for a bigger textbox
  * "Slider" for a jQuery UI slider. Note that the slider's left side is always 0 and its right side is always 100
* answers
  * for "Radio" and "Check", the options that the participant can choose among.
  * for "Free" and "Textarea", suggested text that can be filled in.
  * for "Slider", the labels on the left and right side of the slider.

The file inputexample.csv provides a guideline for what the input file should look like.

To-do list
---------
- [ ] create an inputexample csv file
- [ ] put everything a directory up
- [ ] clean up from unused files
- [ ] improve the developers documentation
- [ ] make all the paths relative so others can actually use them!
- [ ] make it so we're able to run the CSVtoJS script without going to the code
- [ ] make an installer or sth? idk.
