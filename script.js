// player element to be moved
const toothy = document.getElementById("toothy");
const toothyTop = parseInt(window.getComputedStyle(toothy).top);
const playButton = document.getElementById('playButton');
var TitleCard = document.getElementById("TitleCard");
const myScore = document.getElementById("myScore");
const myHealth = document.getElementById("myHealth");
let enemies = document.getElementsByClassName("enemy");
const displayScore = document.getElementById("displayScore");

var target = document.getElementById("target");
var hits = 0;
var lane = 1;
var myInterval;
var myScoreInterval;
var soundInterval;
var n = 0;
var points = 0;

var playing = false;

//GAMEPLAY STUFF

playButton.addEventListener('click', start);


function checkDead(){
    if(hits > 2){
    TitleCard.style.opacity =  1;
    playButton.style.opacity =  1;
    playButton.style.zIndex = 6;
    clearInterval(myInterval);
    clearInterval(myScoreInterval);
    displayScore.innerHTML = "Score: "+ points;
    displayScore.style.opacity =  1;
    myScore.style.zIndex = "10";
    myScore.style.left = "160px";
    myScore.style.top = "300px";
    myScore.style.
    myHealth.innerHTML = "Health:"+ (3-hits);
    
    for(var i = 0; i < n; i++){
        let deleteEnemy = document.getElementById('enemy' + n);
        deleteEnemy.remove();
    }
    n=0;
    }
}

function start(){
    TitleCard.style.opacity =  0;
    playButton.style.opacity =  0;
    playButton.style.zIndex = 0;
    displayScore.style.opacity =  0;
    myScore.style.zIndex = "0";
    myScore.style.left = "100px";
    myScore.style.top = "0px";
    hits=0;
    points=0;
    lane = 1;
    updateLane();
    myHealth.innerHTML = "Health: "+ (3-hits);
    myScore.innerHTML = "Score: "+ points;
    clearInterval(myInterval);
    clearInterval(myScoreInterval);
    clearInterval(soundInterval);
    myInterval = setInterval(function() { createEnemy() }, 3500); // creates enemies
    myScoreInterval = setInterval(function() { addScore() }, 1000); 
    soundInterval = setInterval(function() { let audio = document.querySelector('#sound');
   audio.play();   }, 1000); 
  

    
   
   
}
// move thing
function move(targetThing){
    var targetLeft = parseInt(window.getComputedStyle(targetThing).left);
    targetThing.style.left = (targetLeft - 20) + "px";
    if (isCollide(toothy, targetThing)) {
                hits++;
                
        let audio1 = document.querySelector('#sound2');
        audio1.play(); 
                
                checkDead();
                targetThing.style.left = "-100px";
                myHealth.innerHTML = "Health: "+ (3-hits);
                console.log("hits: " + hits);
                
 

    };
}

function createEnemy() {
    var enemy  = document.createElement("img");
    enemy.id = "enemy" + n;
    enemy.class = "enemy";
    n++;
    enemy.style.height = "50px";
    enemy.style.width = "50px";
    enemy.style.position = "absolute";
    enemy.style.left = "500px";
    let temp = getRandomInt(3);
    console.log(temp);
    switch(temp) {
        case 0: // sea
            enemy.src = "assets/GummyWorm.gif";
            enemy.style.top = "250px";
            break;
        case 1: // land
            enemy.src = "assets/Cake.gif";
            enemy.style.top = "150px";
            break;
        case 2: // sky
            enemy.src = "assets/Candy.gif";
            enemy.style.top = "70px";
            break;
    }
    
    document.body.appendChild(enemy);
    var myMoveInterval = setInterval(function() { move(enemy) }, 250);
}

function addScore(){
    points += 50;
    myScore.innerHTML = "Score: "+ points;
}

//KEYBOARD STUFFS

// listen for keydowns anywhere on document
document.addEventListener("keydown", getKey);

function getKey(event) {
    var whichKey = event.keyCode;

    // get toothy's top & left positions
    // var toothyTop = parseInt(window.getComputedStyle(toothy).top);
    // var toothyLeft = parseInt(window.getComputedStyle(toothy).left);

    switch (whichKey) {
        // console.log(whichKey);
        // move toothy with arrow keys
            case 38: // arrowUp (y decreases)
                console.log("up");
                moveToothyUp();
                break;
            case 40: // arrowDown (y increases)
                console.log("down");
                moveToothyDown();
                break;
    }
} 
    
function updateLane(){
    switch(lane){
        case 0: // sea
            toothy.style.top = "230px";
            toothy.src = "assets/tooth-swimming.gif";
            break;
        case 1: //land
            toothy.style.top = "150px";
            toothy.src = "assets/tooth-walking.gif";
            break;
        case 2: //sky
            toothy.style.top = "70px";
            toothy.src = "assets/tooth-flying.gif";
            break;
    }
}// end keyboard movement control

function moveToothyUp() {
    lane++;
    if(lane > 2){
        lane = 2;
    }
  for (let w = 0; w < 0; w++){
        var currentEnemy = document.getElementById("enemy" + n);
        if (isCollide(toothy, currentEnemy)) {
        hits++;
        checkDead();
        console.log("hits: " + hits);
    };
  }
    updateLane();
}

function moveToothyDown() {
    lane--;
    if(lane<0){
        lane = 0;
    }
    for (let w = 0; w < 0; w++){
        var currentEnemy = document.getElementById("enemy" + n);
        if (isCollide(toothy, currentEnemy)) {
        hits++;
        checkDead();
        console.log("hits: " + hits);
    };
  }
    updateLane();
}

function getButtonValue(button) {
    return button.value;
}

// gamepad buttons like NOT joystick
window.addEventListener('gamepadconnected', (event) => {
    const update = () => {
        const output = document.getElementById('buttons');
        output.innerHTML = ''; // clear the output

        for (const gamepad of navigator.getGamepads()) {
            if (!gamepad) continue;
            for (const [index, button] of gamepad.buttons.entries()) {
                // output.insertAdjacentHTML('beforeend',
                // `<label>${gamepad.index}, ${index}
                //     <progress value=${button.value}></progress>
                //     ${button.touched ? 'touched' : ''}
                //     ${button.pressed ? 'pressed' : ''}
                // </label>`);
                if (button.value != 0) {
                    if (index == 3) {
                        button.value == 0;
                        setTimeout(getButtonValue, 10000);
                        moveToothyUp();
                        break;
                    }
                    if (index == 1) {
                        button.value == 0;
                        setTimeout(getButtonValue, 10000);
                        moveToothyDown();
                        break;
                    }
                    console.log("aahwagga");
                    console.log(button);
                    console.log(button.value);
                }

            }
        }
        requestAnimationFrame(update);
    };
    update();
});


// did toothy touch target?

function isCollide(a, b) {
    var aTop = parseInt(window.getComputedStyle(a).top);
    var aBottom = aTop + parseInt(window.getComputedStyle(a).height);
    var aLeft = parseInt(window.getComputedStyle(a).left);
    var aRight = aLeft + parseInt(window.getComputedStyle(a).width);

    var bTop = parseInt(window.getComputedStyle(b).top);
    var bBottom = bTop + parseInt(window.getComputedStyle(b).height);
    var bLeft = parseInt(window.getComputedStyle(b).left);
    var bRight = bLeft + parseInt(window.getComputedStyle(b).width);


    if (aBottom > bTop
        && aTop < bBottom
        && aRight > bLeft
        && aLeft < bRight) {
        return true;
    }
    return false;
}
 
 




//GAMEPAD STUFFS

// gamepad status
window.addEventListener('gamepadconnected', (event) => {
    console.log('connected:', event.gamepad.connected);
});
window.addEventListener('gamepaddisconnected', (event) => {
    console.log('connected:', event.gamepad.connected);
});



// gamepad axes
window.addEventListener('gamepadconnected', (event) => {
    const update = () => {
        const output = document.getElementById('axes');
        output.innerHTML = ''; // clear the output

        for (const gamepad of navigator.getGamepads()) {
            if (!gamepad) continue;
            for (const [index, axis] of gamepad.axes.entries()) {
                // output.insertAdjacentHTML('beforeend',
                // `<label>${gamepad.index}, ${index}
                //     <progress value=${axis * 0.5 + 0.5}></progress>
                // </label>`);
                if (Math.abs(axis) >= 0.2) {
                    console.log("erbagerba");
                    console.log(index);
                    console.log(axis);
                }
            }
        }
        requestAnimationFrame(update);
    };
    update();
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
