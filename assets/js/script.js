//Questions and answers, first answer in each sub-array is correct;
var Q = ["What is JavaScript?","Who invented Javascript?","Inside which HTML element do we put the JavaScript?", "Does JS have a native function to shuffle a string?","Which line will give us a random integer between 0 and 9 inclusive?"];
var A =[["a programming language for dynamically rendering webpages","a recipe for perfect coffee","a programming language for scientific calculations", "a recent verion of Java"],["Brendan Eich","Linus Torvalds","Bjarne Stroustrup","William Gates"],["<script>","<src>","<javascript>","<link>"],["no","yes","in newer versions only","in older versions only"],["Math.floor(Math.random()*10)","Math.floor(Math.random()*9)","Math.random(0,9)","Math.random(0,10)"]];

//scores and initials
var scoreBoard = [[],[]];
var m = 0;//high value in selection sort
var h=0;//holder for switching elements in selection sort

//get central "action" div, this element does not change, everything except the timer happens here
var action = document.getElementById("action");
action.setAttribute("style", "text-align:center");
//create start button
var startButton = document.createElement("button");
startButton.textContent = "START";
startButton.addEventListener("click",quiz);
//create end button
var okayButton = document.createElement("button");
okayButton.textContent = "OK";
okayButton.addEventListener("click",restart);
//get "timer" and "time" elements
var timer = document.getElementById("timer");
var time = document.getElementById("time");



//create question and answer elements
var q = document.createElement("h3");
var a1 = document.createElement("button");
var a2 = document.createElement("button");
var a3 = document.createElement("button");
var a4 = document.createElement("button");
q.setAttribute("style", "text-align:center");
a1.setAttribute("style", "text-align:center; margin: auto; display:block; width:450px");
a2.setAttribute("style", "text-align:center; margin: auto; display:block; width:450px");
a3.setAttribute("style", "text-align:center; margin: auto; display:block; width:450px");
a4.setAttribute("style", "text-align:center; margin: auto; display:block; width:450px");


//create scoreboard title
var scoreTitle = document.createElement("h2");
scoreTitle.textContent = "HIGH SCORES"

//other variables
var t; //time left
var i; //question number
var s; //score
var r; //random starting point for enumerating the possible answers
var a; //selected answer
var ini;//player initials
var timeLoop;//to interrupt timer setInterval()

////////////////////////////////////////////////////////////////////////////////////////////////

start();


function start(){
    //set score and question number to 0
    s=0;
    i=0;
    
    //display start button
    action.appendChild(startButton);

    //display timer
    t=59;
    time.innerText=t;
    timer.setAttribute("style","visibility:visible");
    timer.setAttribute("style","border:10px solid royalblue");
    
    return;


}

function quiz(){

    //remove start button, start timer, and go to question 0
    startButton.remove();
    timeLoop=setInterval(tick,1000);
    question();

    return;

}



function question(){

    //assign Q and A text, render Q text and A buttons
    q.textContent=Q[i];
    r=Math.floor(Math.random()*4);//pick random number 0-3 to begin enumerating the possible answers for question i
    a1.textContent=A[i][r];
    a2.textContent=A[i][(r+1)%4];//increment r then take modulus 4 to remain within the range of answers
    a3.textContent=A[i][(r+2)%4];
    a4.textContent=A[i][(r+3)%4];

    action.appendChild(q);
    action.appendChild(a1);
    action.appendChild(a2);
    action.appendChild(a3);
    action.appendChild(a4);

    a1.addEventListener("click",answer);
    a2.addEventListener("click",answer);
    a3.addEventListener("click",answer);
    a4.addEventListener("click",answer);

    

    return;

}

function answer(e){

    //if answer is correct then increment score, else decrease time
    if(e.target.textContent==A[i][0]){
        s++;
    }else{
        t-=15;
    }

    removeQA()//clean action div

    //increment question number, if questions are still left call question() again with current question number
    i++;
    if(i<Q.length){
        question(); 
        return;
    }else {
        clearInterval(timeLoop);
        end();
        return;
    }

}

function end(){
    //hide timer
    timer.setAttribute("style","visibility:hidden");
    
    //get initials
    ini = prompt("Your score is "+s+"/"+Q.length+". Enter your initials for scoreboard.", "AAA").substring(0,3).toUpperCase();
    
    //add score and initials
    scoreBoard[0].push(ini);
    scoreBoard[1].push(s);

    //sort highscores (yes this is not very efficient)
    for(let j=0; j<scoreBoard[1].length; j++){
        m = scoreBoard[1][j];
        for(let k=j+1;k<scoreBoard[1].length;k++){
            if (scoreBoard[1][k]>=m){
                //switch scores 
                h = scoreBoard[1][k];
                scoreBoard[1][k]=scoreBoard[1][j];
                scoreBoard[1][j]=h;
                //switch corresponding initials
                h = scoreBoard[0][k];
                scoreBoard[0][k]=scoreBoard[0][j];
                scoreBoard[0][j]=h;

            }
        }
    }

    scores();

    return;
}

function scores(){

    //render title
    action.appendChild(scoreTitle);

    //dynamically create scoreboard lines
    for(let j=0; j<scoreBoard[1].length; j++){

        
        //a div for each line
        eval("var player"+j+"=document.createElement('div');")
        eval("player"+j+".setAttribute('style', 'display:flex; justify-content:space-between; width:300px; margin:auto');")

        //containing a div for initials and a div for score
        eval("var init"+j+"=document.createElement('div');")
        eval("init"+j+".textContent = '" + scoreBoard[0][j]+"';")
        
        eval("var scor"+j+"=document.createElement('div');")
        eval("scor"+j+".textContent = '" + scoreBoard[1][j]+"';")
        
        //render
        eval("action.appendChild(player"+j+");")
        eval("player"+j+".appendChild(init"+j+");")
        eval("player"+j+".appendChild(scor"+j+");")

        
    }

    //render end button
    action.appendChild(okayButton);


}

function restart(){


    //clean action div
    scoreTitle.remove();
    okayButton.remove();

    for(let j=0; j<scoreBoard[1].length; j++){
    
        action.children[0].remove();

    }

    //restart
    start();


}

function tick(){
    //decrement and display time
    t--;
    time.innerText=t;

    

    if(t<1){
        //interrupt timer, clean action div, go to initials entry prompt
        clearInterval(timeLoop);
        removeQA();
        end();

        //change colors to indicate time urgency

    }else if(t<11){
        timer.setAttribute("style","border:10px solid red");
    }else if(t<21){
        timer.setAttribute("style","border:10px solid darkorange");
    }else if(t<31){
        timer.setAttribute("style","border:10px solid gold");
    }else if(t<41){
        timer.setAttribute("style","border:10px solid chartreuse");
    }else if(t<51){
        timer.setAttribute("style","border:10px solid aqua");
    }

}

function removeQA(){
    q.remove();
    a1.remove();
    a2.remove();
    a3.remove();
    a4.remove();
    a1.removeEventListener("click",answer);
    a2.removeEventListener("click",answer);
    a3.removeEventListener("click",answer);
    a4.removeEventListener("click",answer);
}