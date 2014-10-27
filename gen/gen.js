var conditions = new Array();
var text = new Array();
var questions = new Array();
conditions[0]="1";text[0]="The editor hired the reporter.";questions[0]="Did the editor see someone?";
conditions[1]="2";text[1]="The accountant wrote a report for the executive.";questions[1]="Did the accountant contact someone?";
var row=0;
function newValue(){
document.getElementById("condition").innerHTML = conditions[row];
document.getElementById("text").innerHTML = text[row];
document.getElementById("question").innerHTML = questions[row];
row=row+1;
}