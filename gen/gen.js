var conditions = new Array();
var text = new Array();
var questions = new Array();
var answerTypes = new Array();
var answers = new Array();
conditions[0]="1";text[0]="The editor hired the reporter.";questions[0]="Did the editor see someone?";answerTypes[0]="Radio";answers[0]="['Yes', 'No', 'Maybe']";
conditions[1]="2";text[1]="The accountant wrote a report for the executive.";questions[1]="Did the accountant contact someone?";answerTypes[1]="Check";answers[1]="['Yes', 'No', 'Maybe']";
conditions[2]="3";text[2]="The fox said, hatee-hatee-hatee-ho.";questions[2]="What does the fox say?";answerTypes[2]="Free";answers[2]="['Ring-ding? Hatee-ho?']";
var row=0;
function newValue(){
document.getElementById("condition").innerHTML = conditions[row];
document.getElementById("text").innerHTML = text[row];
document.getElementById("question").innerHTML = questions[row];
if(answerTypes[row]=="Radio"){
document.getElementById("free").style.visibility="hidden";
document.getElementById("check").style.visibility="hidden";
document.getElementById("radio").style.visibility="visible";
document.getElementById("free").style.height="0px";
document.getElementById("check").style.height="0px";
document.getElementById("radio").style.height="250px";
document.getElementById("radio").innerHTML="<input type=\"radio\" name=\"question\" value=\"answer1\">Radio<br><input type=\"radio\" name=\"question\" value=\"answer2\">Answer"}
if(answerTypes[row]=="Check"){
document.getElementById("free").style.visibility="hidden";
document.getElementById("check").style.visibility="visible";
document.getElementById("radio").style.visibility="hidden";
document.getElementById("free").style.height="0px";
document.getElementById("check").style.height="250px";
document.getElementById("radio").style.height="0px";
document.getElementById("check").innerHTML="<input type=\"checkbox\" name=\"question\" value=\"answer1\">Checkbox<br><input type=\"checkbox\" name=\"question\" value=\"answer2\">Answer"}
if(answerTypes[row]=="Free"){
document.getElementById("free").style.visibility="visible";
document.getElementById("check").style.visibility="hidden";
document.getElementById("radio").style.visibility="hidden";
document.getElementById("free").style.height="250px";
document.getElementById("check").style.height="0px";
document.getElementById("radio").style.height="0px";
document.getElementById("free").innerHTML="<input type=\"text\" name=\"question\">"}
if(row<(text.length-1))row=row+1;
}