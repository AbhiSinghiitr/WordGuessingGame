

// LEVEL CHOOSE
function levelChoose(){
    document.getElementById("startGame").style.display="none";
    document.getElementById("chooseLevel").classList.remove("disabledChooseLevel")
    document.getElementById("chooseLevel").classList.add("activeChooseLevel")
}

// MAIN GAMING AREA
function gamingZone(easy){
    document.getElementById("chooseLevel").style.display="none";
    document.getElementById("playGame").classList.remove("disabledGamingArea");
    document.getElementById("playGame").classList.add("activeGamingArea")
    var foodName;
    var totalGame=0;
    var correctAnswer=0;
    var wrongAnswer=0;
    var streakCount=0;



    // fetching image;
    fetchImage();
    function fetchImage(){fetch("https://foodish-api.herokuapp.com/api/").then((response) => {
        return response.json();
    }).then((data) => {
        window.console.log(data);
        document.getElementById("image-box").src = data.image;
        window.console.log("This is final")
        findFoodName(data.image);
    })}
    
    
    //findingFoodName;
    function findFoodName(link){
        var b =true;
        var last ;
        for(var i=41;b;i++){
            if(link.charAt(i)=='/'){
                b=false;
                last=i;
            }
        }
        foodName=link.slice(41,last);
        foodName = foodName.toLowerCase();
        const vowel = ['a','e','i','o','u'];
        var hint="";
    
        for(var i=0;i<foodName.length;i++){
            var ch=foodName.charAt(i);
            
            if(vowel.includes(ch)){
                hint = hint+ch;
            }
            else{
                hint =hint+ "_";
            }
        }
        if(easy){
            document.getElementById("hint").innerHTML="HINT : "+hint;
        }
        else{
            document.getElementById("hint").innerHTML="NO HINT";
        }
    }
    
    
    //checking answer
    var form = document.getElementById("ans");
    form.addEventListener('submit' , (event)=>{
        event.preventDefault();
        var ans = form['answer'].value;
        ans=ans.toLowerCase();
        if(ans==foodName){
            correctAnswer+=1;
            streakCount+=1;
            document.getElementById("correctAnswerResult").style.display="block";
            document.getElementById("answerAnnouncement").style.display='block';
            document.getElementById("trueAnswer").innerHTML="CORRECT ANSWER : "+foodName;
            setTimeout(hideResult,4000);
           
        }
        else{
            wrongAnswer+=1;
            streakCount=0
            document.getElementById("wrongAnswerResult").style.display="block";
            document.getElementById("answerAnnouncement").style.display='block';
            document.getElementById("trueAnswer").innerHTML="CORRECT ANSWER : "+foodName;
            setTimeout(hideResult,4000);
        }
        window.console.log("workingFine");
        totalGame+=1;
        updateAnswer();
        form.reset();
        fetchImage();
    })
    

    //updating Answer
    function updateAnswer(){
        window.console.log("inside function");
        document.getElementById('totalAnswer').innerHTML= totalGame;
        document.getElementById('correctAnswer').innerHTML=correctAnswer;
        document.getElementById('wrongAnswer').innerHTML=wrongAnswer;
        document.getElementById('streakCount').innerHTML=streakCount;
        window.console.log("updated answers");
    }
}

// HIDDING ANOUNCEMENT RESULT
function hideResult(){
    document.getElementById("correctAnswerResult").style.display="none";
    document.getElementById("wrongAnswerResult").style.display="none";
    document.getElementById("answerAnnouncement").style.display="none";
}



