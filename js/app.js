// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y + 55;
    this.step = 101;
    this.speed = speed;
    this.boundary = this.step * 5;
    this.resetPos = -this.step;


    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.


    if(this.x < this.boundary){
        this.x += this.speed * dt;

    }
    else{
        // if it the bug hits the boundary, 
        // it will become a new bug
        this.x = -101 * (getRandomInt(5)+1);
        this.y = (83 * getRandomInt(3)) +55;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//-------------------hero class---------------
class hero{
    constructor(){
        this.step = 101;
        this.jump = 83;
        this.sprite = 'images/char-boy.png';
        this.startX = this.step *2;
        this.startY = (this.jump * 4) + 55;
        this.x = this.startX;
        this.y = this.startY;
        this.victory = false;
        // this.life = 1;
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
    }
    handleInput(input){
        switch(input){
            case 'up':
                if(this.y > 0)
                {
                    this.y -= this.jump;
                }
                break;
            case 'down':
                if(this.y < this.jump * 4 ){
                    this.y += this.jump;
                }
                break;
            case 'left':
                if(this.x > 0)
                {
                    this.x -= this.step;
                }
                break;
            case 'right':
                if(this.x < this.step *4)
                {
                    this.x += this.step;
                }
                break;
   
        }
    }
    update(){
        console.log(this.x, this.y);
        for(let enemy of allEnemies){
            if(this.y === enemy.y && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2)){
                this.reset();
            }
        }
        if(this.y == -28)
        {
            this.victory = true;
            console.log("win");
        }
        
    }
    reset(){
        this.y = this.startY;
        this.x = this.startX;
    }

}
//------------------------------------------

const allEnemies = [];

function fiveEnemy(){
    for(i = 0; i < 5; i++)
    {
        const bug = addNewEnemy();
        allEnemies.push(bug);
    }
}

fiveEnemy();
const player = new hero();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



function addNewEnemy(){

    var num1 = getRandomInt(6);
    var num2 = getRandomInt(3);
    var num3 = getRandomInt(4);
    return new Enemy((num1*-101), 83* num2 , 125 * num3);
}
function getRandomInt(max){
    return Math.floor(Math.random() * Math.floor(max));
}


// const heartContainer = document.querySelector('.hearts');
// const heart = `<li><i class="fa fa-star"></i></li>`;
// heartContainer.innerHTML = heart + heart + heart;
// function dead(value) {
//     switch(value){
//         case 1:
//              heartContainer.innerHTML = heart + heart + heart;
//              break;
//         case 2:
//             heartContainer.innerHTML = heart + heart;
//             break;
//         case 3:
//             heartContainer.innerHTML = heart;
//             break;
//     }
// }

