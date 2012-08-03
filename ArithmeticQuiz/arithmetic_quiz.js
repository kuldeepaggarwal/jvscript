function start_quiz() {
    window.open('arithmetic_quiz_questions.html', 'TEST WINDOW', 'width=1000,height=400,location=0;scrollbars=0,menubar=0,toolbar=0,resizeable=0,status=0', 1).focus();

}
var timer_forques, QuesAnsRecord = {};
var input_tb = document.getElementById("answer");
QuesAnsRecord["score"] = {"correct" : 0, "incorrect" : 0, "unmarked" : 0};
TotalQues = 20;
no_of_ques = TotalQues;
no_correctanswers = 0;
ClockTimer = 30;
function timer_display() {
    document.getElementById('CLK').innerHTML = timer_forques + "s";
    timer_forques--;
    setting_time_for_each_ques = setTimeout('timer_display()', 1000);
    if (timer_forques < -1) {
        timer_forques = ClockTimer;
        clearTimeout(setting_time_for_each_ques);
    }
}
function clock() {
    CreateQuestions(no_of_ques);
    document.getElementById("next").disabled =false;
    setting_time_for_each_ques = setTimeout('timer_display()', 0);//just for initialisation of 'setting_time_for_each_ques'
    set_interval_for_next_ques = setInterval('next_question()', 0);
}

function next_question() {
    clearTimeout(setting_time_for_each_ques);
    no_of_ques--;
    clearInterval(set_interval_for_next_ques);
    document.getElementById('CLK').innerHTML = timer_forques + "s";
    if (no_of_ques != 19) {
        evaluation();
        empty_answer_tb();
    }
    if (no_of_ques <= -1) {
        Result(TotalQues);        
    } else {
        question_printing(20 - Number(no_of_ques));
        set_interval_for_next_ques = setInterval('next_question()', 30500);
        timer_display();
        timer_forques = ClockTimer;
    }
}

function question_printing(ques_no) {
    document.getElementById("1").textContent = QuesAnsRecord[ques_no]["question"];
    document.getElementById("ques_num_lbl").textContent = ques_no + ":";
}
function CreateQuestions(NoOfQues) {
  for(var i = 1; i <= NoOfQues; i++) {
    var num1 = Math.floor((Math.random() * 20) + 1), num2 = Math.floor((Math.random() * 20) + 1);
    operator = Math.floor((Math.random() * 10) / 2);
    switch (operator) {
    case Number(1):
        QuesAnsRecord[i] = {"question" : num1 + ' + ' + num2, "expected_ans" : eval(num1 + num2), "user_ans" : ""};
        break;
    case Number(2):
        QuesAnsRecord[i] = {"question" : num1 + ' - ' + num2, "expected_ans" : eval(num1 - num2), "user_ans" : ""};
        break;
    case Number(3):
        QuesAnsRecord[i] = {"question" : num1 + ' * ' + num2, "expected_ans" : eval(num1 * num2), "user_ans" : ""};
        break;
    case Number(4):
        QuesAnsRecord[i] = {"question" : num1 + ' / ' + num2, "expected_ans" : Math.floor((num1 / num2) * 100) / 100, "user_ans" : ""};
        break;
    default:
        QuesAnsRecord[i] = {"question" : num1 + ' * ' + num2, "expected_ans" : eval(num1 * num2), "user_ans" : ""};
    }
  }
}
function evaluation() {
    var previous_qtn_num = 20 - Number(no_of_ques) - 1;
    QuesAnsRecord[previous_qtn_num]["user_ans"]= parseFloat(input_tb.value) ;
    if (isNaN(QuesAnsRecord[previous_qtn_num]["user_ans"])) {
        QuesAnsRecord["score"]["unmarked"] += 1;
    } else if (QuesAnsRecord[previous_qtn_num]["user_ans"] == QuesAnsRecord[previous_qtn_num]["expected_ans"]) {
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
    console.log(tablerow.style.textColor);
    console.log(tablerow.style.color);
    }
    document.getElementById("total_score").innerText = QuesAnsRecord["score"]["correct"];
}
