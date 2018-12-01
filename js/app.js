// ES6 code

// Score counter variable
let score=0;

// Enemy Class : definition for the police patroling the lanes.
class Enemy {
  constructor(x, y, v_enemy, rndm_enemy_art) {
    this.sprite = rndm_enemy_art; // rndm_enemy_art is the randomly selected file name of an enemy per lane
    this.x = x;  //******* x + Math.random() * y
    this.y = y;
    this.vel = v_enemy;
    this.enemyWidth = 101;
    // this.vertical = 85;
    this.canvasWidth = this.enemyWidth * 5;
  }

  // update() : Updates the enemy's position, required method for game
  update(dt) {
    if (this.x < this.canvasWidth) // this condition helps keep the enemy looping on the same lane within the canvas area
      this.x += this.vel * dt; // 'dt' virtually keeps track of JS processing speed in a user's browser which helps maintain near consistent frame per second across devices. It is found by finding how much of time difference there is between each call.
    else
      this.x = -this.enemyWidth;
  }

  // Draw / Render the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

}

// Enemy Class : definition for the police patroling the lanes.
// This class implements an update(), render() and a handleInput() method.
class Player {
  constructor(rndm_player_art) {
    this.sprite = rndm_player_art;
    this.playerWidth = 101;
    this.playerHeight = 82;
    this.x = this.playerWidth * 2;
    this.y = this.playerHeight * 4.6;
  }

  update(dt) {
    // Detecting collision by checking the distance between each of enemy entity and the player
    for (let enemy of allEnemies) {
      let deltaX = this.x - enemy.x;
      let deltaY = this.y - enemy.y;
      let dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      if (dist < 60) {
    this.x = this.playerWidth * 2;
    this.y = this.playerHeight * 4.6;
    alert(`Scored: ${score}. Try again!`);
    score=0;
      }
    }

    // Checking whether the player crossed the swap successfully
    if (this.y < 10) {
        score++;
      this.y = this.playerHeight * 4.6;
    }

    // Updating score
    document.getElementById("scoreboard").innerHTML = `Score: ${score}`;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(key) {
    switch (key) {
      case "up":
        if (this.y > 0) {
          this.y -= this.playerHeight;
        }
        break;
      case "down":
        if (this.y < this.playerHeight * 4) {
          this.y += this.playerHeight;
        }
        break;
      case "left":
        if (this.x > 0) {
          this.x -= this.playerWidth;
        }
        break;
      case "right":
        if (this.x < this.playerWidth * 4) {
          this.x += this.playerWidth;
        }
        break;
    }
  }
}

// Array of all the enemy art
const enemy_art = [
  "images/enemy-A.png",
  "images/enemy-B.png"
];

// Randomizing the enemy_art on each refresh
// let rndm_enemy_art = enemy_art[Math.floor(Math.random() * enemy_art.length)];
function randomEnemyArt() {
  return enemy_art[Math.floor(Math.random() * enemy_art.length)];
}

function randomSpeed(){
    return Math.floor(Math.random()*(400-135+1)+135);
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [
  new Enemy(-200, 50, randomSpeed(), randomEnemyArt()),
  new Enemy(-150, 135, randomSpeed(), randomEnemyArt()),
  new Enemy(-100 * 2.5, 220, randomSpeed(), randomEnemyArt())
];


// Array of all the player art
const player_art = [
  "images/char-boy.png",
  "images/char-cat-girl.png",
  "images/char-horn-girl.png",
  "images/char-pink-girl.png",
  "images/char-princess-girl.png"
];

//Randomizing the player art on each refresh
let rndm_player_art = player_art[Math.floor(Math.random() * player_art.length)];

// Place the player object in a variable called player
let player = new Player(rndm_player_art);

// This listens for key presses and sends the keys to Player.handleInput() method.
document.addEventListener("keyup", function (e) {
  let allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };
  player.handleInput(allowedKeys[e.keyCode]);
});