function start_quiz() {
    window.open('arithmetic_quiz_questions.html', 'TEST WINDOW', 'width=1000,height=400,location=0;scrollbars=0,menubar=0,toolbar=0,resizeable=0,status=0', 1).focus();

}
var timer_for_ques, QuesAnsRecord = {};
var input_tb = document.getElementById("answer");
QuesAnsRecord["score"] = {"correct" : 0, "incorrect" : 0, "unmarked" : 0};
TotalQues = 20;//Total No of ques
ques_no = 1;//set for first question
ClockTimer = 30;//No of seconds for each question
function timer_display() {
    if (timer_for_ques == 0) {
      resetTimer();
    } else {
      timer_for_ques--;
      document.getElementById('CLK').innerHTML = timer_for_ques + "s";
    }
}
function startTest() {
    GenerateQuestions(TotalQues);
    setTimer();
}
function setTimer() {
  timer_for_ques = ClockTimer;
  document.getElementById('CLK').innerHTML = ClockTimer + "s";
  setting_time_for_each_ques = setInterval('timer_display()',1000)
  next_question();
}
function resetTimer() {
  clearInterval(setting_time_for_each_ques);
  evaluation(ques_no);
  ques_no++;
  empty_answer_tb();
  setTimer();
}
function next_question() {
    if (ques_no == TotalQues) {
        evaluation(ques_no);
        Result(TotalQues);        
    } else {
        question_printing(ques_no);
    }
}

function question_printing(ques_no) {
    document.getElementById("1").textContent = QuesAnsRecord[ques_no]["question"];
    document.getElementById("ques_num_lbl").textContent = ques_no + ":";
}
function GenerateQuestions(NoOfQues) {
  for(var i = 1; i <= NoOfQues; i++) {
    var num1 = numGenerate(), num2 = numGenerate();
    operator =  genOper();
    operation(num1, num2, i ,operator);
  }
}
function numGenerate() {
  return Math.floor((Math.random() * 20) + 1);
}
function genOper() {
  return Math.floor((Math.random() * 4)) + 0;
}
function operation(num1, num2, i,operator) {
    operators = ['+','-','*','/']
    switch (operators[operator]) {
    case '+':
        QuesAnsRecord[i] = {"question" : num1 + ' + ' + num2, "expected_ans" : eval(num1 + num2), "user_ans" : ""};
        break;
    case '-':
        QuesAnsRecord[i] = {"question" : num1 + ' - ' + num2, "expected_ans" : eval(num1 - num2), "user_ans" : ""};
        break;
    case '*':
        QuesAnsRecord[i] = {"question" : num1 + ' * ' + num2, "expected_ans" : eval(num1 * num2), "user_ans" : ""};
        break;
    case '/':
        QuesAnsRecord[i] = {"question" : num1 + ' / ' + num2, "expected_ans" : Math.floor((num1 / num2) * 100) / 100, "user_ans" : ""};
        break;
    default:
        console.log("Error");
    }
}
function evaluation(ques) {
    QuesAnsRecord[ques]["user_ans"]= parseFloat(input_tb.value) ;
    if (isNaN(QuesAnsRecord[ques]["user_ans"])) {
        QuesAnsRecord["score"]["unmarked"] += 1;
    } else if (QuesAnsRecord[ques]["user_ans"] == QuesAnsRecord[ques]["expected_ans"]) {
         QuesAnsRecord["score"]["correct"] += 1;
    } else {
        QuesAnsRecord["score"]["incorrect"] += 1;
    }
    document.getElementById("score_tb").value = QuesAnsRecord["score"]["correct"];
}
function empty_answer_tb() {
    input_tb.value = ""
    input_tb.focus();
}
function Result(NoOfQues) {
    document.getElementById("questions").style.display = "none";
    document.getElementById("result_div").style.display = "block";
    tablename = document.getElementById("result_table");
    for(var i = 1; i <= NoOfQues; i++) {
    var tablerow = tablename.insertRow(-1);
    var qno = tablerow.insertCell(0);
    var ques = tablerow.insertCell(1);
    var act_ans = tablerow.insertCell(2);
    var user_ans = tablerow.insertCell(3);
    qno.innerText = i;
    ques.innerText = QuesAnsRecord[i]["question"];
    act_ans.innerText = QuesAnsRecord[i]["expected_ans"];
    user_ans.innerText = QuesAnsRecord[i]["user_ans"];
    bgcolor = QuesAnsRecord[i]["expected_ans"] == QuesAnsRecord[i]["user_ans"] ? "#003800" : "red"
    forecolor = "white"
    if(isNaN(QuesAnsRecord[i]["user_ans"])) {
        bgcolor = "white"
        forecolor = "black"
    }
    tablerow.style.backgroundColor = bgcolor;
    tablerow.style.color = forecolor;
    }
    document.getElementById("total_score").innerText = QuesAnsRecord["score"]["correct"];
}
