var conditions = new Array();
var text = new Array();
var questions = new Array();
conditions[0]="Condition"; conditions[1]="New condition"; conditions[2] = "Even newer condition";
text[0]="This is some text"; text[1]="This is some more text"; text[2] = "And a here is a third example of text";
questions[0]="Why did the chicken cross the street?"; questions[1]="Do you like apples?"; questions[2] = "Who are the sultans of swing?";
var row=0;
function newValue(){
document.getElementById("condition").innerHTML = conditions[row];
document.getElementById("text").innerHTML = text[row];
document.getElementById("question").innerHTML = questions[row];
row=row+1;
}