/************************************** הגדרת משתנים ******************************************/


//משתנה שאחראי על התורות
let turnCounter = 0;

//משתנה שאחראי על סהכ סיבובי המשחקים
let round = 1;

//משתנה שקובע את דרגת הקושי - ברירת מחדל קל-בינוני
let level = 1;

//משתנים שאחראיים על סכימת סהכ הנקודות בכל המשחקים
let totalUserPoints = 0;
let totalCompPoints = 0;

//משתנים שאחראים לאסחן בתוכם את המשבצות הנבחרות
let tempArrUser = [];
let tempArrComp =[];

//משתנה שאחראי לשמור בתוכו את האינדקס של קומבינציית הניצחון
let CombinationIndex;


//יצירת סט שמגדיר את התיבות הפנויות לשימוש
let emptyBoxes = new Set([1,2,3,4,5,6,7,8,9]);


//שמירת קומבינציות הניצחון
let combinationsWin = [
    new Set([1,2,3]),
    new Set([4,5,6]),
    new Set([7,8,9]),
    new Set([1,4,7]),
    new Set([2,5,8]),
    new Set([3,6,9]),
    new Set([1,5,9]),
    new Set([3,5,7])
];




/************************************** הגדרת פונקציות ******************************************/


function computerBlock(){
    let count = 0;
    //i מסמל סט ספציפי של קומבינציית ניצחון
    for(let i = 0; i < combinationsWin.length; i++){
        //j מסמל את האינדקס במערך הזמני של המשבצות התפוסות של המשתמש
            for(let j = 0; j < tempArrUser.length; j++){
                //אם הקומבינצית ניצחון מכילה בתוכה את המספר 
                if(combinationsWin[i].has(tempArrUser[j]))
                    count++;                    
                    //המרת הסט קומבינצית ניצחון למערך
                    combinationsWinTemp = Array.from(combinationsWin[i]);
                    //אם יש 2 מספרים  
                    if(count == 2){

                        //  הוא יהיה משבצת חסימה במידה והוא פנוי <- נמצא את המספר האחרון בקומבינציה שלא נמצא ברצף של ה2
                        for(let k = 0; k < 3; k++){
                            if(!tempArrUser.includes(combinationsWinTemp[k]) && Array.from(emptyBoxes).includes(combinationsWinTemp[k]))
                            {
                                //נוריד מסט המשבצות הפנויות
                                removeBoxFromGame(combinationsWin[k]);
                                return combinationsWinTemp[k];
                            }
                        }

                    }
            }
            count = 0;
    }
    //במידה ואין מה לחסום
    return -1;
}



//בדיקה האם התקיימה קומבינציית ניצחון
function isWin(arr){
   arr = new Set(arr); //המרה לסט
   for(let i = 0; i < combinationsWin.length; i++){
        if(combinationsWin[i].isSubsetOf(arr)){
            document.getElementById('line').classList.add(`line${i}`);
            document.getElementById('line').style.display = 'block';
            CombinationIndex = i;
            return true;
        } 
   }

   return false;

}

function computerWin(){

    let count = 0;
    let combinationsWinTemp;

    for(let i = 0; i < combinationsWin.length; i++){

        for(let j = 0; j < tempArrComp.length; j++){
            
            combinationsWinTemp = Array.from(combinationsWin[i]);

            if(combinationsWinTemp.includes(tempArrComp[j]))
                count++;
            
            if(count == 2){
                for(let k = 0; k < 3; k++){
                    if(!tempArrComp.includes(combinationsWinTemp[k]) && emptyBoxes.has(combinationsWinTemp[k])){
                        removeBoxFromGame(combinationsWinTemp[k]);
                        return combinationsWinTemp[k];
                    }
                }
               
            }
        }

        count = 0;
    }

    return -1;

}

//פונקציה שאחראית על הוספת נקודות לטבלה בעת ניצחון
function addLinePoints(){
    let pointsUser = 0;
    let pointsComp = 0;
    if(turnCounter % 2 == 0){
        pointsComp = 1;
        totalCompPoints++;
    } 
    else{
        pointsUser = 1;
        totalUserPoints++;
    } 
    document.getElementById('tbodyPoints').innerHTML += `<tr><td>${round}</td><td>${pointsUser}</td><td>${pointsComp}</td></tr>`;
    document.getElementById('totalUser').innerText = totalUserPoints;
    document.getElementById('totalComp').innerText = totalCompPoints;
}



//פונקציה שחראית על הוספת נקודות לטבלה בתיקו
function addLinePointsEnd(){
    document.getElementById('tbodyPoints').innerHTML += `<tr><td>${round}</td><td>0</td><td>0</td></tr>`;
}



//הדפסה של מי התור
function whoTurn(){
    let turnOb = document.getElementById('whoTurn');
    turnCounter % 2 == 0 ? turnOb.innerText = 'המשתמש' : turnOb.innerText = 'המחשב';
}
whoTurn();



//מקבלת אינדקס של תיבה מסוימת  - מוחקת מהסט את המספר תיבה ששומש
function removeBoxFromGame(index){
    //מחיקת המשבצת הנבחרת משימוש
    emptyBoxes.delete(index);
}



//פונקציה שאחראית על מציאת תיבה ריקה רדומנלית
function isBoxEmptyComp(){
    //בחירת מספר רנדומלי למשבצת 
    let randomBox = Math.floor(Math.random() * 10); 
    while(!emptyBoxes.has(randomBox)){
        randomBox = Math.floor(Math.random() * 10);
        
    }
    return randomBox;
}



//סיום משחק - לוח מלא
function endGame(){
    setTimeout(addPopUpEnd, 1000);
}


//פונקציה שמוסיפה פופ אפ של ניצחון וסיום משחק
function addPopUp(){
    let popUpOb = document.getElementById('popUp');
    let winner;
    if(turnCounter % 2 != 0) winner = 'המשתמש ניצח';
    else winner = 'המחשב ניצח';  
    popUpOb.innerHTML = `${winner}<br><br>! game over <br> click <span onclick="startOver()">here</span> to start over`;
    popUpOb.style.display = 'block';
    document.getElementById('container').style.display = 'none';
    addLinePoints();
    round++;
}


//פונקציה שמוסיפה פופ אפ של תיקו וסיום משחק
function addPopUpEnd(){
    let popUpOb = document.getElementById('popUp');
    popUpOb.innerHTML = 'tie <br><br>! game over <br> click <span onclick="startOver()">here</span> to start over';
    popUpOb.style.display = 'block';
    document.getElementById('container').style.display = 'none';
    addLinePointsEnd();
    round++;
}



//פונקצית איפוס לתחילת הסיבוב הבא
function startOver(){
      //איפוס
      tempArrUser = [];
      tempArrComp = [];
      turnCounter = 0;
      emptyBoxes = new Set([1,2,3,4,5,6,7,8,9]);
      //מחיקת התמונות מהלוח
      let arrClassXCircle = document.getElementsByClassName('imgXorCircle');
      while(arrClassXCircle.length != 0){
        arrClassXCircle[0].remove();        
      }
      //סגירת הפופ אפ
      document.getElementById('popUp').style.display = 'none';
      document.getElementById('line').style.display = 'none';
      //לבדוק האם קיים בכלל כי אם עושים משחק חדש למרות שהמשחק לא נגמר אז זה לא נכון
      document.getElementById('line').classList.remove(`line${CombinationIndex}`);
      document.getElementById('container').style.display = 'flex';
      clearTimeout(clearTimeOutTurn);
      whoTurn();     
}



//פונקציה שמאפסת את טבלת הנקודות
function resetPoints(){
    document.getElementById('tbodyPoints').innerHTML = '';
    document.getElementById('totalUser').innerText = 0;
    document.getElementById('totalComp').innerText = 0;
    totalCompPoints = 0;
    totalUserPoints = 0;
    round = 0;
}


//הפונקציה קובעת את רמת הקושי - דיפולט זה 1
function levels(){
    if(document.getElementById('level').value == 1){
        level = 1;
        return 1;
    }
    else if(document.getElementById('level').value == 2){
        level = 2;
        return 2;
    }
    else{
        level = 3;
        return 3;
    }

    
}


//פונקציה ששולחת אלרט בעת שינוי של הדרגה
function levelsAlerts(){
    if(document.getElementById('level').value == 1)
        alert('בחרת בדרגת קושי קלה. התחל לשחק');
    else if(document.getElementById('level').value == 2)
        alert('בחרת בדרגת קושי בינונית. התחל לשחק');
    else
        alert('בחרת בדרגת קושי קשה. התחל לשחק');

    startOver();
}




//פונקציה שמורה על תחילת המשחק
function addPopStartGame(){
    let popUpOb = document.getElementById('popUpStart');
    document.getElementById('container').style.display = 'none';
    popUpOb.innerHTML = '<p> התחל משחק</p>';
    // popUpOb.innerHTML += '<p class="Pstart" style="font-size: 50px">איקס עיגול</p>';

    setInterval(function(){
        document.getElementById('popUpStart').style.transform = 'translate(-50%, -50%) scale(1.5)';
        setTimeout(() => document.getElementById('popUpStart').style.transform = 'translate(-50%, -50%) scale(1)', 500);
    } ,1000);

    popUpOb.onclick = function(){
        popUpOb.style.display = 'none';
        document.getElementById('container').style.display = 'flex';

    }
}


//פונקציה שמטפלת במקרים של לחיצה על משבצת כשאסור
function MustNotClick(index){
    if(!emptyBoxes.has(index)){
        alert('בחרת משבצת תפוסה. אנא בחר בשנית');
        return true;
    }
}



//בחירת משבצת ע"י המשתמש
function userChooseBox(indexBox){
    turnCounter++;
    whoTurn();
    //סימון על הלוח
    document.getElementById(`box${indexBox}`).innerHTML = '<p class="imgXorCircle"><span class="material-symbols-outlined">close</span></p>';
    //הורדת המשבצת מהאפשרויות
    removeBoxFromGame(indexBox);
    //מערך זמני למטרת זיהוי של קומבינצית ניצחון
    tempArrUser.push(indexBox);             
}



//הפונקציה בוחרת מספר משבצת למחשב
function computerChooseBoxRandomly(){   
    turnCounter++;
    whoTurn();
    
        if(levels() == 1){
            randomBox = isBoxEmptyComp();
        }
        else if(levels() == 2){
            randomBox = computerWin();
            if(randomBox == -1)
                randomBox = isBoxEmptyComp();
        }
        else{ 
            // קבלת  מספר משבצת לחסימה של המשתמש
            randomBox = computerWin();
            //אין מה לחסום 
            if(randomBox == -1){
                randomBox = computerBlock();
                if(randomBox == -1)
                    randomBox = isBoxEmptyComp();
            }
        }
    


    //סימון על הלוח
    document.getElementById(`box${randomBox}`).innerHTML = '<p class="imgXorCircle"><span class="material-symbols-outlined">circle</span></p>';
    //הורדת המשבצת מהאפשרויות
    removeBoxFromGame(randomBox);
    //מערך זמני למטרת זיהוי של קומבינצית ניצחון
    tempArrComp.push(randomBox);
    //האם המחשב ניצח ?
    isWin(tempArrComp);      
}


let clearTimeOutTurn;
//פונקציה ראשית ! - מופעל בעת לחיצה על משבצת
function above(index){

    while(MustNotClick(index)){
        return;
    }

    userChooseBox(index);

    // נבדוק אם יש ניצחון למשתמש
    if(isWin(tempArrUser)){
        setTimeout(addPopUp, 1000);
        return;
    }
    //אחרת נבדוק האם המשחק נגמר
    else if(turnCounter == 9){
        endGame();
        return;
    }
    else{
        clearTimeOutTurn = setTimeout(() => {
            computerChooseBoxRandomly();
            //נבדוק אם יש ניצחון
            if(isWin(tempArrComp)){
                setTimeout(addPopUp, 1000);
                return;
            }
        }, 1000);
    }
}



//כאשר האתר נטען נפעיל את הפונקציה שמורה על פתיחת המשחק
onload = function(){
    addPopStartGame();
}


function chagneScreenPattern(){
    let tableSideObg = document.getElementById("tableSide");
    if(window.innerWidth <= 600){
        tableSideObg.remove();
        document.getElementById("container").appendChild(tableSideObg);
    }
    else if(window.innerWidth >= 940){
        tableSideObg.remove();
        document.getElementById('innerDiv').appendChild(tableSideObg);
    }
}

//נתאים את מבנה המסך לגודלו
window.addEventListener("resize", chagneScreenPattern);
window.addEventListener("load", chagneScreenPattern);